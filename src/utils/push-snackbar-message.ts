import { enqueueSnackbar } from "notistack"
import { isServerResponseErrorNull, isServerResponseErrorString, ServerResponseErrorData } from "./request"

export const pushServerApiSnackbarMessage = (data: { error: ServerResponseErrorData }) => {
	if (isServerResponseErrorNull(data.error)) {
		return
	}
	const message = isServerResponseErrorString(data.error) ? data.error : `${data.error.code}: ${data.error.message}`
	enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 })
}

const error = (message: string) => {
	enqueueSnackbar(message, { variant: 'error', autoHideDuration: 5000 })
}
const info = (message: string) => {
	enqueueSnackbar(message, { variant: 'info', autoHideDuration: 5000 })
}

const success = (message: string) => {
	enqueueSnackbar(message, { variant: 'success', autoHideDuration: 5000 })
}

const warning = (message: string) => {
	enqueueSnackbar(message, { variant: 'warning', autoHideDuration: 5000 })
}

export const pushSnackbarMessage = {
	errorServerApi: (error: ServerResponseErrorData) => pushServerApiSnackbarMessage({ error }),
	error,
	info,
	success,
	warning,
}

