import { qs } from "@nsnanocat/util";

/**
 * Hono 路由上下文类型。
 * Hono route context type.
 * @typedef {import("hono").Context} HonoContext
 */
/**
 * Hono 请求类型。
 * Hono request type.
 * @typedef {HonoContext["req"]} HonoRequest
 */
/**
 * Worker 标准化请求头字典。
 * Worker normalized header dictionary.
 * @typedef {Record<string, string | string[] | undefined>} WorkerHeaders
 */
/**
 * Worker 标准化内部请求对象。
 * Worker normalized internal request payload.
 * @typedef {{ method: string, url: string, headers: WorkerHeaders, body?: ArrayBuffer, bodyBytes?: ArrayBuffer }} WorkerRequest
 */
/**
 * Worker 标准化内部响应对象。
 * Worker normalized internal response payload.
 * @typedef {{ status?: number, statusCode?: number, headers?: WorkerHeaders, body?: string | ArrayBuffer | Uint8Array | null, bodyBytes?: ArrayBuffer | Uint8Array | null }} WorkerResponse
 */

export default class HonoWorkerAdapter {
	/**
	 * 根据云端入口与回退路径恢复上游 URL。
	 * Restore the upstream URL from the cloud entrypoint and fallback path.
	 * @param {URL} url 当前请求 URL。
	 * Current request URL.
	 * @param {string} restPath 回退路由路径。
	 * Fallback route path.
	 * @returns {URL} 路由后的 URL。
	 * Routed URL.
	 */
	static routeRewrite(url, restPath = "") {
		url.protocol = "https:";
		url.port = "443";
		switch (true) {
			case url.hostname.endsWith(".pages.dev"):
			case url.hostname.endsWith(".workers.dev"): {
				const [host, ...path] = `${restPath}`.split("/");
				if (!host) break;
				url.hostname = host;
				url.pathname = `/${path.join("/")}`;
				break;
			}
			default:
				break;
		}
		return url;
	}

	/**
	 * 清理并标准化转发请求头。
	 * Clean and normalize forwarded request headers.
	 * @param {WorkerHeaders} headers 原始请求头。
	 * Raw request headers.
	 * @returns {WorkerHeaders} 标准化请求头。
	 * Normalized request headers.
	 */
	static normalizeRequestHeaders(headers = {}) {
		const blacklist = new Set(["connection", "content-length", "host", "x-forwarded-proto", "x-real-ip"]);
		return Object.entries(headers).reduce((normalized, [key, value]) => {
			if (value === undefined) return normalized;
			const normalizedKey = key.toLowerCase();
			if (normalizedKey.startsWith("cf-") || blacklist.has(normalizedKey)) return normalized;
			normalized[key] = value;
			return normalized;
		}, {});
	}

	/**
	 * 从 Hono 请求构造内部请求对象。
	 * Build the internal request payload from a Hono request.
	 * @param {HonoRequest} req Hono 请求。
	 * Hono request.
	 * @returns {Promise<WorkerRequest>} 标准化请求对象。
	 * Normalized request payload.
	 */
	static async buildRequest(req) {
		const url = HonoWorkerAdapter.routeRewrite(new URL(req.url), req.param("rest"));
		const method = req.method;
		let bodyBytes;
		switch (method) {
			case "GET":
			case "HEAD":
			case "OPTIONS":
				break;
			default:
				bodyBytes = await req.arrayBuffer().catch(error => {
					console.info(error);
					return undefined;
				});
				if (!bodyBytes?.byteLength) bodyBytes = undefined;
				break;
		}
		return {
			method,
			url: url.toString(),
			headers: HonoWorkerAdapter.normalizeRequestHeaders(req.header()),
			body: bodyBytes,
			bodyBytes,
		};
	}

	/**
	 * 清理回写前的响应头。
	 * Clean response headers before writing them back.
	 * @param {WorkerHeaders} headers 原始响应头。
	 * Raw response headers.
	 * @returns {WorkerHeaders} 清理后的响应头。
	 * Cleaned response headers.
	 */
	static cleanupResponseHeaders(headers = {}) {
		const normalized = { ...headers };
		if (normalized["Content-Encoding"]) normalized["Content-Encoding"] = "identity";
		if (normalized["content-encoding"]) normalized["content-encoding"] = "identity";
		delete normalized["Content-Length"];
		delete normalized["content-length"];
		delete normalized["Transfer-Encoding"];
		delete normalized["transfer-encoding"];
		return normalized;
	}

	/**
	 * 将内部响应对象写回 Hono。
	 * Write the internal response payload back through Hono.
	 * @param {HonoContext} c Hono 上下文。
	 * Hono context.
	 * @param {WorkerResponse} $response 内部响应对象。
	 * Internal response payload.
	 * @returns {Response} Hono 响应。
	 * Hono response.
	 */
	static writeResponse(c, $response = {}) {
		const headers = HonoWorkerAdapter.cleanupResponseHeaders($response.headers ?? {});
		for (const [key, value] of Object.entries(headers)) {
			if (Array.isArray(value)) {
				for (const entry of value) c.header(key, entry.toString(), { append: true });
				continue;
			}
			if (value !== undefined) c.header(key, value.toString());
		}
		c.status($response.status ?? $response.statusCode ?? 200);
		return c.body($response.body ?? $response.bodyBytes ?? null);
	}

	/**
	 * 解析模块参数并移除传输字段。
	 * Parse module arguments and remove transport fields.
	 * @param {WorkerRequest} $request 标准化请求对象。
	 * Normalized request payload.
	 * @returns {WorkerRequest} 已移除传输参数的请求对象。
	 * Request with transport arguments removed.
	 */
	static buildArgument($request = {}) {
		const headerArgument = $request.headers.$argument ?? $request.headers["biliverse-args"];
		if (headerArgument) {
			globalThis.$argument = qs.parse(headerArgument);
			delete $request.headers.$argument;
			delete $request.headers["biliverse-args"];
			return $request;
		}
		const url = new URL($request.url);
		globalThis.$argument = qs.parse(url.search);
		for (const key of [...url.searchParams.keys()]) {
			if (/^[A-Z]/.test(key)) url.searchParams.delete(key);
		}
		$request.url = url.toString();
		return $request;
	}
}
