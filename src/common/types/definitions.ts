import {AppStatus} from "../constant/status.enum";

export interface ApiResponse<T> {
    status: AppStatus
    data?: T | null ,
    message?: string
}
