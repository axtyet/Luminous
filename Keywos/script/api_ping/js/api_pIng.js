// 2025-02-10 05:29:33
!(async () => {
  let timeouts = 5000;
  try {
    let url = typeof $request !== "undefined" && $request.url,
      ms,
      ins = Object.fromEntries(
        (url.split("?")[1] || "")
          .split("&")
          .map((i) => i.split("="))
          .map(([k, v]) => [k, decodeURIComponent(v)])
      );
    const getEnv = () => {
      return "undefined" != typeof Egern
        ? "Egern"
        : "undefined" != typeof $environment && $environment["surge-version"]
        ? "Surge"
        : "undefined" != typeof $environment && $environment["stash-version"]
        ? "Stash"
        : "undefined" != typeof module && module.exports
        ? "Node.js"
        : "undefined" != typeof $task
        ? "Quantumult X"
        : "undefined" != typeof $loon
        ? "Loon"
        : "undefined" != typeof $rocket
        ? "Shadowrocket"
        : void 0;
    };
    timeouts = Number(ins.timeout) || 5000;
    if (ins.url == "test") {
      ms = "1";
    } else {
      ms = await new Promise((resolve, reject) => {
        let e = Date.now();
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject("");
            resolve(timeouts);
          }, timeouts);
        });
        const reqPromise = new Promise((resolve) => {
          $httpClient.get(ins.url, resolve);
        });
        Promise.race([reqPromise, timeoutPromise])
          .then((i) => {
            resolve(Date.now() - e);
          })
          .catch((error) => {
            reject(error);
            resolve(timeouts);
          });
      });
    }
    $done({
      response: {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sp: 1,
          ms: ms,
          app: getEnv(),
          timeouts: timeouts,
        }),
      },
    });
  } catch (e) {
    console.log(e.message);
    throw new Error();
  }
})()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(() => $done());
