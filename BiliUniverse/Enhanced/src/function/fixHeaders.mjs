import { Console } from "@nsnanocat/util";

/**
 * Fix Headers
 * 用于修复 content-type: application/grpc 的响应头
 * @author VirgilClyne
 * @param {Object} requestHeaders 请求头
 * @param {Object} responseHeaders 响应头
 * @returns {Object} 修复后的响应头
 */
export default function fixHeaders(requestHeaders, responseHeaders) {
	Console.log("☑️ Fix Headers");
	const request = requestHeaders && typeof requestHeaders === "object" ? requestHeaders : {};
	const response = responseHeaders && typeof responseHeaders === "object" ? responseHeaders : {};
	const ua = String(request["User-Agent"] ?? request["user-agent"] ?? "");
	switch (true) {
		case ua.startsWith("bili-universal/"):
		case ua.includes("bili-universal/"):
			if (request["x-bili-moss-engine-type"] === "1") response["grpc-status"] = "0";
			break;
		case ua.startsWith("bili-inter/"):
		case ua.includes("bili-inter/"):
			Reflect.deleteProperty(response, "grpc-status");
			break;
		case ua.startsWith("bili-blue/"):
		case ua.includes("bili-blue/"):
			response["grpc-status"] = "0";
			break;
	}

	Console.log("✅ Fix Headers");
	return response;
}
