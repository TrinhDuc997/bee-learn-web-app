// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyServer, ProxyResCallback } from "http-proxy";
// import cookies from "js-cookie";
// type Data = {
//   name: string
// }

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
  if (req.method != "POST") {
    return res.status(404).json({
      error: {
        code: "method_required",
        message: "Method not supported",
      },
    });
  }
  return new Promise((resolve) => {
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        body += chunk;
      });
      proxyRes.on("end", () => {
        try {
          const { token } = JSON.parse(body);
          console.log(token);
          // convert to token to cookies
          if (!token) {
            (res as NextApiResponse).status(404).json(JSON.parse(body));
          } else {
            (res as NextApiResponse).status(200).json({
              ...(JSON.parse(body) || {}),
              message: "login succcessfully",
            });
          }
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Something went wrong" });
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", handleLoginResponse);
    req.url = req.url?.replace("/api/", "");

    proxy.web(req, res, {
      target: "http://localhost:8000/v1/user/",
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });

  //   res.status(200).json({ name: 'Path - Math all API...' })
}
