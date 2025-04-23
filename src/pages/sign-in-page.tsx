import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks";
import { RequestAxiosError } from "../types";
import { getErrorMessage } from "../utils/get-error-message.ts";
import Loader from "../components/ui/loader/loader.tsx";

export default function SignInPage() {
  const { googleLoginFn } = useAuth();
  const navigate = useNavigate();

  const googleLoginMutation = useMutation({
    mutationFn: googleLoginFn,
    onSuccess: async () => {
      toast.success("Successfully signed in");
      navigate("/");
    },
    onError: (error: RequestAxiosError) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      googleLoginMutation.mutate(response.credential);
    }
  };

  const handleError = () => {
    toast.error("Failed to sign in");
  };

  if (googleLoginMutation.isPending)
    return <Loader active text={"Please wait..."} />;

  return (
    <div className={"h-screen relative"}>
      <div
        className={
          "w-sm rounded mt-32 absolute left-1/2 transform -translate-x-1/2 p-8 shadow-lg"
        }
      >
        <div className={"text-center"}>
          <h1 className={"text-2xl font-semibold"}>SpSeoTools</h1>
          <p className={"text-sm mt-2"}>Sign in to your account with Google</p>
        </div>
        <div className={"flex justify-center mt-8"}>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
        <div className={"text-sm mt-8 text-center"}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
