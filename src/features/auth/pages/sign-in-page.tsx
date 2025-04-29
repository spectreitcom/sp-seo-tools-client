import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/use-auth.ts";
import { getErrorMessage, RequestAxiosError } from "../../shared";
import Loader from "../../shared/components/loader/loader.tsx";

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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">SpSeoTools</h1>
          <p className="text-gray-600 mt-2">
            Sign in to your account with Google
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
        <div className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
