import { toast } from "react-hot-toast";

export const notify = {

  success(message: string) {
    toast.success(message);
  },

  error(message: string) {
    toast.error(message);
  },

  loading(message: string) {
    return toast.loading(message);
  },

};
