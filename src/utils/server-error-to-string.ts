import { isServerResponseErrorCodeMessage, ServerResponseErrorData } from "@/types"

export function serverErrorToString(error: ServerResponseErrorData) {
	if (isServerResponseErrorCodeMessage(error)) {
		return `code: ${error.code} message: ${error.message}`
	}
	return error
}
