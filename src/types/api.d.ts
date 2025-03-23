export type ServerResponseErrorCodeMessageData = { code: string, message: string }

export type ServerResponseErrorData = string | ServerResponseErrorCodeMessageData

export function isServerResponseErrorString(val: ServerResponseErrorData): val is string {
	return typeof val === 'string'
}

export function isServerResponseErrorCodeMessage(val: ServerResponseErrorData): val is ServerResponseErrorCodeMessageData {
	if (typeof val !== 'object') {
		return false
	}
	return typeof val?.code === 'number' && typeof val?.message === 'string'
}

interface ServerResponseData {
	error: ServerResponseErrorData | null,
	data: unknown | null,
}

export function isValueServerResponseErrorData(val: unknown): val is ServerResponseErrorData {
	if (val === undefined || val === null) {
		return false
	}
	const error = val as ServerResponseErrorData
	return (
		isServerResponseErrorString(error) ||
		isServerResponseErrorCodeMessage(error)
	)
}
export interface AppServerResponseData extends ServerResponseData {
	extendedError?: unknown,
}
export type OrderByProps = 'asc' | 'desc'
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
