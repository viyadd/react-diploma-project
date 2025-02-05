import { selectUserSession } from "../selectors";
import { useCallback } from "react";
import { useAppSelector } from "./use-app-store";

export const useServerAuthorization = () => {
	const session = useAppSelector(selectUserSession);
	return useCallback(() => session ? session : '', [session],
	);
};
