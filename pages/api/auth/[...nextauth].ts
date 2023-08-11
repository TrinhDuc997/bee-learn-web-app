import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

export const authOptions: AuthOptions = {
  // Cấu hình các provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: async (profile) => {
        const { sub: id, name, email, picture: image } = profile;
        const response = await axios.post(
          `${process.env.TARGET_API}/v1/user/login`,
          {
            loginBy: "google",
            token: jwt.sign(
              { id, name, email, image },
              process.env.JWT_KEY as string
            ),
          }
        );
        return response.data;
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      profile: async (profile) => {
        const { id, name, email, picture } = profile;
        const { data } = picture;
        const { url: image } = data;
        const response = await axios.post(
          `${process.env.TARGET_API}/v1/user/login`,
          {
            loginBy: "facebook",
            token: jwt.sign(
              { id, name, email, image },
              process.env.JWT_KEY as string
            ),
          }
        );
        return response.data;
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req): Promise<any> => {
        // Gọi API từ máy chủ Node.js để kiểm tra thông tin đăng nhập
        const { username, password } = (req as NextApiRequest).query;
        const response = await axios.post(
          `${process.env.TARGET_API}/v1/user/login`,
          { username, password }
        );

        if (response.status === 200) {
          return response.data;
        } else {
          return response;
        }
      },
    }),
  ],
  secret: process.env.JWT_KEY as string,
  callbacks: {
    async jwt(params) {
      const { token, user, trigger, session } = params;
      if (trigger === "update") {
        return { ...token, ...session.user };
      } else {
        return { ...token, ...user };
      }
    },
    async redirect(param) {
      return param.url;
    },
    async session(params) {
      const { session, token: tokenJWT } = params;
      return { ...session, user: { ...tokenJWT, token: undefined } };
    },
  },
};

export default NextAuth(authOptions);
