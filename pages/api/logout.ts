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
  // cookies.set("access_token", "");
  res.status(200).json({ message: "Logout Successfully..." });
}
