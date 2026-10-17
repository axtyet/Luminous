import assert from "node:assert/strict";
import test from "node:test";
import { Console } from "@nsnanocat/util";
import fixHeaders from "../src/function/fixHeaders.mjs";

Console.logLevel = "OFF";
const clients = ["bili-universal", "bili-hd2", "bili-overseas", "bili-blue", "bili-inter", "unknown"];

test("gRPC completion follows the client and Moss engine without overwriting existing status", () => {
	for (const client of clients) {
		for (const moss of ["1", "0", undefined]) {
			for (const status of [undefined, "0", "7", "16"]) {
				for (const capitalized of [false, true]) {
					const request = { [capitalized ? "User-Agent" : "user-agent"]: `grpc-c++/1 ${client}/90000000` };
					if (moss !== undefined) request[capitalized ? "X-Bili-Moss-Engine-Type" : "x-bili-moss-engine-type"] = moss;
					const statusKey = capitalized ? "Grpc-Status" : "grpc-status";
					const headers = { keep: "yes" };
					if (status !== undefined) headers[statusKey] = status;
					const expected = { ...headers };
					const requiresStatus = client === "bili-blue" || (["bili-universal", "bili-hd2", "bili-overseas"].includes(client) && moss === "1");
					if (status === undefined && requiresStatus) expected[statusKey] = "0";
					if (client === "bili-blue") expected[capitalized ? "grpc-status" : "Grpc-Status"] = "0";
					if (client === "bili-inter" && status === "0") delete expected[statusKey];
					assert.deepEqual(fixHeaders(request, headers), expected, JSON.stringify({ client, moss, status, capitalized }));
				}
			}
		}
	}
});

test("lowercase and capitalized metadata are read and updated independently", () => {
	assert.deepEqual(fixHeaders({ "User-Agent": "bili-hd2/1", "X-Bili-Moss-Engine-Type": "0", "x-bili-moss-engine-type": "1" }, {}), { "grpc-status": "0" });
	assert.deepEqual(fixHeaders({ "User-Agent": "bili-hd2/1", "X-Bili-Moss-Engine-Type": "1", "x-bili-moss-engine-type": "0" }, {}), { "Grpc-Status": "0" });
	assert.deepEqual(fixHeaders({ "User-Agent": "bili-inter/1" }, { "Grpc-Status": "7", "grpc-status": "0" }), { "Grpc-Status": "7" });
	assert.deepEqual(fixHeaders({ "User-Agent": "bili-inter/1" }, { "Grpc-Status": "0", "grpc-status": "16" }), { "grpc-status": "16" });
	assert.deepEqual(fixHeaders({ "User-Agent": "bili-hd2/1", "X-Bili-Moss-Engine-Type": "1", "x-bili-moss-engine-type": "1" }, { "Grpc-Status": "7", "grpc-status": "16" }), { "Grpc-Status": "7", "grpc-status": "16" });
});
