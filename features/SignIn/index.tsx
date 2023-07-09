"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import HeroInput from "../../components/HeroInput";

const SignIn = () => {
  const router = useRouter();
  return (
    <HeroInput
      title="Login now!"
      content="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
      excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
      a id nisi."
      input={{
        label: "Email",
        placeholder: "email",
      }}
      nextInput={{
        label: "Security Code",
        placeholder: "security code",
      }}
      button={{
        next: "Login",
        check: "Next",
      }}
      check={async (input) => {
        await signIn("email", {
          email: input,
          callbackUrl: "/",
        });
        return false;
      }}
      next={async (input, nextInput) => {
        const params = new URLSearchParams({
          email: input ?? "",
          token: nextInput ?? "",
          callbackUrl: window.location.origin,
        });

        router.push(`/api/auth/callback/email?${params.toString()}`);
      }}
    />
  );
};

export default SignIn;
