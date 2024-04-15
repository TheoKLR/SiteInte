import { toast } from "react-toastify";

interface data {
  value: number;
}

export const toArray = (json: any[]): number[] => {
  let result: number[] = [];
  json.map((i: data) => result.push(i.value));
  return result;
};

export const toId = (json: any) => {
  return json.value;
};

export const handleError = async (
  success_msg: string,
  error_msg: string,
  func: Function,
  ...args: any[]
) => {
  try {
    const response = await func(...args);
    if (response.status > 201 || !response) {
      toast.error(error_msg);
      return false;
    }
    toast.success(success_msg);
    return true;
  } catch (err) {
    toast.error(error_msg);
    return false;
  }
};
