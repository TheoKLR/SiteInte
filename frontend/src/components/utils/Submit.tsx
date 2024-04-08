import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
interface data {
    value: number
}

export const toArray = (json: any[]): number[] => {
    let result: number[] = []
    json.map((i: data) => result.push(i.value))
    return result
}

export const toId = (json: any) => {
    return json.value
}

export const handleError = async (success_msg: string, error_msg: string, func: Function, ...args: any[]) => {
    try {
        const response = await func(...args);
        if (response.status > 201 || !response) {
            return toast.error(error_msg);
        } 
        return toast.success(success_msg);
    } catch (err) {
        console.error(err)
        return toast.error(error_msg);
    }
}