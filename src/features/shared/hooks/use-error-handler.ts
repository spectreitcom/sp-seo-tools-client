import { AxiosError } from "axios";
import { useNavigate } from "react-router";

export function useErrorHandler() {
  const navigate = useNavigate();

  const handle401Error = (error: AxiosError | null | undefined) => {
    if (error && error.status === 401) {
      navigate("/sign-in");
    }
  };

  return {
    handle401Error,
  };
}
