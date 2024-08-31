import axios from "axios";
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

export const tochainString = (json: any[]) => {
  let result: string = "";

  json.forEach((e, index) => {
    // Append the value to the result string
    result += e.value.toString();
    // If it's not the last element, add a plus sign
    if (index < json.length - 1) {
      result += "+";
    }
  });


  return result;
};

export const handleError = async (
  success_msg: string,
  error_msg: string,
  func: Function,
  ...args: any[]
) => {
  try {
    const response = await func(...args);
    if (!response || response.status >= 400) {
      const errorMessage = response?.data?.message || 'Unknown error';
      toast.error(`${error_msg} : ${errorMessage}`);
      return false;
    }

    toast.success(success_msg);
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // If the error is from Axios
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
        toast.error(`${error_msg}: ${err.response.data.message || 'Unknown server error'}`);
      } else if (err.request) {
        console.error('Error request data:', err.request);
        toast.error(`${error_msg}: No response from server`);
      } else {
        console.error('Error message:', err.message);
        toast.error(`${error_msg}: ${err.message}`);
      }
    } else {
      // Handle any other type of error
      console.error('Error:', err);
      toast.error(error_msg+":" + err);
    }
    return false;
  }
};
