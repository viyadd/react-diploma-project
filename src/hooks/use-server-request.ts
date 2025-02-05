import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';
import { server } from '../bff';
import { useCallback } from 'react';
import { AppOperationAPI } from '../bff/constants';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(operation: AppOperationAPI, ...params:[any]) => {
			const request = ['register', 'authorize'].includes(
				operation
			)
				? params
				: {session, ...params};

			return server[operation](request);
		},
		[session],
	);
};
