async function request(method, params) {
  // 基于 $httpClient 的请求封装
  return new Promise((resolve) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  // 请求地址（IP 信息接口）
  const url = "https://my.ippure.com/v1/info";

  const { error, response, data } = await request("GET", url);

  // 网络或数据获取异常处理
  if (error || !data) {
    return $done({
      title: "IPPure Overview",
      htmlMessage: "<b>Network Error</b>"
    });
  }

  let json;
  try {
    // 解析返回的 JSON 数据
    json = JSON.parse(data);

    // 输出接口原始数据
    console.log(JSON.stringify(json, null, 2));

  } catch {
    return $done({
      title: "IPPure Overview",
      htmlMessage: "<b>Invalid JSON</b>"
    });
  }

  // 节点名称
  const nodeName = $environment.params?.node ?? "Unknown Node";

  // IP 地址字段兼容处理
  const ip = json.ipAddress || json.query || json.ip || "Unknown";

  // 位置（拼接城市/地区/国家）
  const loc = [json.city, json.region, json.country]
    .filter(Boolean)
    .join(", ") || "Unknown";

  // ISP 信息
  const isp = json.asOrganization || "Unknown";

  // ASN 信息字段兼容处理
  const asn =
    json.asNumber ||
    json.asn ||
    (json.as && json.as.replace(/[^0-9]/g, "")) ||
    "Unknown";

  // Fraud Score（系数评分）
  const score = json.fraudScore ?? "N/A";

  // 类型标识（Residential住宅 vs DC机房 / Broadcast广播 vs Native原生）
  const isRes = Boolean(json.isResidential);
  const isBrd = Boolean(json.isBroadcast);
  const typeText = isRes ? "Residential" : "DC";
  const brdText = isBrd ? "Broadcast" : "Native";

  // HTML 输出内容
  const html = `
<div style="margin:0;padding:0;font-family:-apple-system;font-size:large;">

<br>
<b>Node:</b> ${nodeName}<br><br>

<b>IP:</b> ${ip}<br><br>

<b>Location:</b> ${loc}<br><br>

<b>ISP:</b> ${isp}<br><br>

<b>ASN:</b> ${asn}<br><br>

<b>Fraud Score:</b> ${score}<br><br>

<b>Type:</b> ${typeText} • ${brdText}

</div>
`.trim();

  return $done({
    title: "IPPure Overview",
    htmlMessage: html
  });
}

(async () => {
  // 主流程异常捕获
  try {
    await main();
  } catch (e) {
    $done({
      title: "IPPure Overview",
      htmlMessage: "<b>Script Error:</b> " + e.message
    });
  }
})();
