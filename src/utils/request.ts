export type ServerResponseErrorCodeMessageData = { code: string, message: string }

export type ServerResponseErrorData = string | ServerResponseErrorCodeMessageData | null

export function isServerResponseErrorNull(val: ServerResponseErrorData): val is null {
	return val === null
}

export function isServerResponseErrorString(val: ServerResponseErrorData): val is string {
	return typeof val === 'string'
}

export function isServerResponseErrorCodeMessage(val: ServerResponseErrorData): val is ServerResponseErrorCodeMessageData {
	if (typeof val !== 'object') {
		return false
	}
	return val?.code !== undefined && val?.message !== undefined
}

interface ServerResponseData {
	error?: ServerResponseErrorData,
	data?: unknown,
}

export interface AppServerResponseData extends ServerResponseData {
	extendedError?: unknown,
}

interface RequestProps {
	(path: string,
		method?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
		data?: unknown): Promise<AppServerResponseData>
}

export const request: RequestProps = async (path, method, data) => {
	try {
		const res = await fetch('/api/v1' + path, {
			headers: {
				'content-type': 'application/json',
			},
			method: method || 'GET',
			body: data ? JSON.stringify(data) : undefined,
		});

		if (res.status === 200) {
			return await res.json();
		}

		return new Promise<AppServerResponseData>((resolve) => {
			resolve({
				error: { code: `${res.status}`, message: res.statusText },
			})
		})
	} catch (error) {
		return new Promise<AppServerResponseData>((resolve) => {
			resolve({ error: 'Unexpected error', extendedError: error })
		}
		)
	}

}
