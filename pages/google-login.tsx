import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const PopupGoogleLoginPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") {
      signIn("google");
    } else {
      window.close();
    }
  }, [session, status]);

  return <div>Logging in...</div>;
};

export default PopupGoogleLoginPage;
