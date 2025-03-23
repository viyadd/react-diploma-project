import { isServerResponseErrorCodeMessage, ServerResponseErrorData } from "@/types"
import { enqueueSnackbar } from "notistack"

export const pushServerApiSnackbarMessage = (data: { error: ServerResponseErrorData }) => {
	const message = isServerResponseErrorCodeMessage(data.error) ? `${data.error.code}: ${data.error.message}` : data.error
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

