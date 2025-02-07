import { BASE_URL } from "../../constants";

interface GetUrlFunc {
	(endpoint: string,
		props?: {
			id?: string
			params?: Record<string, unknown>
		}
	): string
}

const valueListToString = (key: string, valueList: string[]) => valueList
	.map(value => `${key}=${value}`).join('&');

export const getUrl: GetUrlFunc = (endpoint, { params, id } = {}) => {
	if (id !== undefined) {
		return `${BASE_URL}${endpoint}/${id}`
	}

	if (params === undefined) {
		return BASE_URL + endpoint
	}

	const paramsString = Object.entries(params).map(([key, value]) => {
		if (Array.isArray(value) && typeof value?.[0] === 'string') {
			return valueListToString(key, value)
		}
		return `${key}=${value}`
	}).join('&')

	return `${BASE_URL}${endpoint}?${paramsString}`
}
