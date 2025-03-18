import { ApiErrorData } from "./api-error-data"

// TODO ??? ошибка определена в resuest
export interface AppServerApiResult {
	error: ApiErrorData | null
}

export interface ApiDataPageDescriptor {
	content: unknown[]
	// perPage: number
	// page: number
	// elements: number
	lastPage: number
}

export function isApiDataPageDescriptor(val: unknown): val is ApiDataPageDescriptor {
	if (val === undefined || val === null) {
		return false
	}
	return typeof val === 'object' && Array.isArray(val.content) && typeof val.lastPage === 'number'
}
