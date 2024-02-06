import {ResponseCode} from "@/utils/types/responseCode";

export const generateResponse = (code: ResponseCode, message: string, data: any[] = []) => {
    return {
        status: code,
        message: message,
        ...(data.length > 0 && {data})
    }
}