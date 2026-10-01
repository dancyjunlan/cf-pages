export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // 目标：转发到 a.com
    const targetHost = "newapi-vps-r.ai-geek.tech";
    const targetUrl = new URL(url.pathname + url.search, `https://${targetHost}`);

    // 复制原始请求，修改Host头为a.com，保证a.com的CF识别正常
    const modifiedReq = new Request(targetUrl, request);
    modifiedReq.headers.set("Host", targetHost);
    // 可选：传递原始访客IP
    modifiedReq.headers.set("X-Forwarded-For", request.headers.get("cf-connecting-ip") || "");

    const resp = await fetch(modifiedReq);
    return resp;
  },
};
