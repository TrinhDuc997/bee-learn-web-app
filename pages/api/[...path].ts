// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
const proxy = httpProxy.createProxyServer();

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // return new Promise((resolve) => {
  //   const handleResponse: ProxyResCallback = (proxyRes, req, res) => {
  //     let body = "";
  //     proxyRes.on("data", (chunk) => {
  //       body += chunk;
  //     });
  //     try {
  //       (res as NextApiResponse).status(200).json(JSON.parse(body) || {});
  //     } catch (error) {
  //       (res as NextApiResponse)
  //         .status(500)
  //         .json({ message: "Something went wrong" });
  //     }
  //     resolve(true);
  //   };
  //   req.url = req.url?.replace("/api/", "");
  //   proxy.once("proxyRes", handleResponse);
  //   proxy.web(req, res, {
  //     target: `${process.env.TARGET_API}`,
  //     changeOrigin: true,
  //     selfHandleResponse: true,
  //   });
  // });
  return new Promise((resolve, reject) => {
    req.url = req.url?.replace(/^\/api/, "");
    proxy.web(
      req,
      res,
      { target: `${process.env.TARGET_API}`, changeOrigin: true },
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      }
    );
  });
}
