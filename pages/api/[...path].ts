// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import { getToken } from "next-auth/jwt";

const proxy = httpProxy.createProxyServer();

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userToken = await getToken({ req, secret: process.env.JWT_KEY });
  if (userToken) {
    const { token } = userToken;
    req.headers.authorization = `token=${token}`;
  }
  return new Promise(async (resolve, reject) => {
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
