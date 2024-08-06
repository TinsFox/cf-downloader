interface Env {
	key: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let key: string | null = null;
		let fileUrl: string | null = null;

		// 处理GET和POST请求
		if (request.method === 'POST') {
			try {
				const formData = await request.formData();
				key = formData.get('key') as string | null;
				fileUrl = formData.get('fileUrl') as string | null;
			} catch (error) {
				return new Response('Invalid form data', { status: 400 });
			}
		} else {
			const { searchParams } = new URL(request.url);
			key = searchParams.get('key');
			fileUrl = searchParams.get('fileUrl');
		}

		// 验证密钥
		if (key !== env.key) {
			return new Response('Forbidden', { status: 403 });
		}

		if (!fileUrl) {
			return new Response('Missing fileUrl parameter', { status: 400 });
		}

		try {
			// 从目标URL获取文件
			const response = await fetch(fileUrl);

			if (!response.ok) {
				return new Response('Failed to fetch the file', { status: response.status });
			}

			// 获取原始的Content-Disposition头
			const contentDisposition = response.headers.get('Content-Disposition') || 'attachment';

			// 直接将响应返回给客户端,保留原始的Content-Disposition
			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: {
					'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
					'Content-Disposition': contentDisposition,
				},
			});
		} catch (error) {
			return new Response(`Error fetching the file: ${(error as Error).message}`, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
