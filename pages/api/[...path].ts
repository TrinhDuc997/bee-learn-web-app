// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
// import cookies from "js-cookie";
const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // convert cookies to headers authorization
  if (req.cookies["access_token"]) {
    req.headers.authorization = "Bearer " + req.cookies["access_token"];
  }
  req.headers.cookie = "";
  req.url = req.url?.replace("/api/", "");
  proxy.web(req, res, {
    target: process.env.TARGET_API,
    changeOrigin: true,
    selfHandleResponse: false,
  });
}
