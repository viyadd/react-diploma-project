interface ApiErrorCodeMessageData {
	code: number,
	message: string,
}

export type ApiErrorData = string | ApiErrorCodeMessageData
