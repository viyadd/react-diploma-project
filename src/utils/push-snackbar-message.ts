import { enqueueSnackbar } from "notistack"
import { isServerResponseErrorNull, isServerResponseErrorString, ServerResponseErrorData } from "./request"

export const pushServerApiSnackbarMessage = (data: { error: ServerResponseErrorData }) => {
	if (isServerResponseErrorNull(data.error)) {
		return
	}
	const message = isServerResponseErrorString(data.error) ? data.error : `${data.error.code}: ${data.error.message}`
	enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 })
}
