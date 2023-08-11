import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const PopupFacebookLoginPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") {
      signIn("facebook", { callbackUrl: "/facebook-login" });
    } else {
      window.close();
    }
  }, [session, status]);

  return <div>Logging in...</div>;
};

export default PopupFacebookLoginPage;
