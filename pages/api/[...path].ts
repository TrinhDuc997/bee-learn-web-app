// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
// import cookies from "js-cookie";
const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    const handleResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        body += chunk;
      });
      proxyRes.on("end", () => {
        try {
          (res as NextApiResponse).status(200).json(JSON.parse(body) || {});
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Something went wrong" });
        }
        resolve(true);
      });
    };

    if (req.cookies["access_token"]) {
      req.headers.authorization = "Bearer " + req.cookies["access_token"];
    }
    req.url = req.url?.replace("/api/", "");
    proxy.once("proxyRes", handleResponse);
    proxy.web(req, res, {
      target: `${process.env.TARGET_API}`,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
