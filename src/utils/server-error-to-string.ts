import { isServerResponseErrorNull, isServerResponseErrorString, ServerResponseErrorData } from "./request";

export function serverErrorToString(error: ServerResponseErrorData) {
	if (isServerResponseErrorNull(error)) {
		return ''
	}
	if (isServerResponseErrorString(error)) {
		return error
	}
	return `code: ${error.code} message: ${error.message}`
}
