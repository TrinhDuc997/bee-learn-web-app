// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyServer, ProxyResCallback } from "http-proxy";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyServer();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    const handleResponse: ProxyResCallback = (proxyRes, req, res) => {
      try {
        let body = "";
        proxyRes.on("data", (chunk) => {
          body += chunk;
        });
        const proxyStatus = proxyRes.statusCode || 500;
        proxyRes.on("end", () => {
          (res as NextApiResponse)
            .status(proxyStatus)
            .json(JSON.parse(body) || {});
          resolve(true);
        });
      } catch (error) {
        (res as NextApiResponse)
          .status(500)
          .json({ message: "have wrong with nextjs server" });
      }
    };

    proxy.once("proxyRes", handleResponse);
    req.url = req.url?.replace(/^\/api/, "");
    proxy.web(req, res, {
      target: `${process.env.TARGET_API}/v1/user/`,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
  //   res.status(200).json({ name: 'Path - Math all API...' })
}
