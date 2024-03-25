import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
interface data {
    value: number
}

export const toArray = (json: any[]) => {
    let result: number[] = []
    json.map((i: data) => result.push(i.value))
    return result
}

export const toId = (json: any) => {
    return json.value
}

export const handleError = async (func: Function, ...args: any[]) => {
    try {
        const response = await func(...args);
        if (response.status !== 200) {
            return toast.error("Failed Notification !");
        } 
        return toast.success("Success Notification !");
    } catch (err) {
        console.error(err)
        return toast.error("Failed Notification !");
    }
}