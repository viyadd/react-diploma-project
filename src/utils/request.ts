import { AppServerResponseData } from "@/types";

export type RequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export interface RequestFunc {
	(path: string,
		method?: RequestMethods,
		data?: unknown): Promise<AppServerResponseData>
}
export interface RequestParams {
	url: string; method: RequestMethods; data: unknown
}

export const request: RequestFunc = async (path, method, data) => {
	try {
		const res = await fetch('/api/v1' + path, {
			headers: {
				'content-type': 'application/json',
			},
			method: method || 'GET',
			body: data ? JSON.stringify(data) : undefined,
		});

		if ([200, 400].includes(res.status)) {
			return await res.json();
		}

		return new Promise<AppServerResponseData>((resolve) => {
			resolve({
				error: { code: `${res.status}`, message: res.statusText },
				data: null,
			})
		})
	} catch (error) {
		return new Promise<AppServerResponseData>((resolve) => {
			resolve({ error: 'Unexpected error', extendedError: error, data: null })
		}
		)
	}

}
