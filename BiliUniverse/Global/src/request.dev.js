import { $app, Console, done } from "@nsnanocat/util";
import { Request } from "./process/Request.dev.mjs";

/***************** Processing *****************/
let $response;
!(async () => {
	({ $request, $response } = await Request($request));
})()
	.catch(e => Console.error(e))
	.finally(() => {
		switch (typeof $response) {
			case "object":
				if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				switch ($app) {
					default:
						done({ response: $response });
						break;
					case "Quantumult X":
						if (!$response.status) $response.status = "HTTP/1.1 200 OK";
						delete $response.headers?.["Content-Length"];
						delete $response.headers?.["content-length"];
						delete $response.headers?.["Transfer-Encoding"];
						done($response);
						break;
				}
				break;
			case "undefined":
				done($request);
				break;
			default:
				Console.error(`不合法的 $response 类型: ${typeof $response}`);
				break;
		}
	});
