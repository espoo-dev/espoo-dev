import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const errorHandler = (error: AxiosError) => {
  const { response } = error;
  if (response && response.data) {
    const { error } = response.data;
    if (error) {
      toast(error, {
        position: "top-right",
        type: "error",
        pauseOnHover: false,
      });
    } else {
      toast("Opss...", {
        position: "top-right",
        type: "error",
        pauseOnHover: false,
      });
    }
  }
  throw error;
};
