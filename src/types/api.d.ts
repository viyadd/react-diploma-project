import { ApiErrorData } from "./api-error-data"

// TODO ??? ошибка определена в resuest
export interface AppServerApiResult {
	error: ApiErrorData | null
}

export interface AppServerPageDescriptor {
	// perPage: number
	// page: number
	// elements: number
	lastPage: number
}
