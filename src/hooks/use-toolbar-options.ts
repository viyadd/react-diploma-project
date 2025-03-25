import { ToolbarOptions } from "@/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./use-app-store";
import { setToolbarOptionList } from "@/actions";

export const useToolbarOptions = () => {
	const [toolbar, setToolbar] = useState<ToolbarOptions[] | null>(null);

	const dispatch = useAppDispatch()

	const setToolbarOptions = (tools: ToolbarOptions[]) => {
		setToolbar(tools)
	}

	const resetToolbarOptions = () => setToolbar(null)

	useEffect(() => {
			if (toolbar === null) {
				dispatch(setToolbarOptionList([]));
				return;
			}
			dispatch(setToolbarOptionList(toolbar));
		}, [dispatch, toolbar]);

	return {
		setToolbarOptions,
		resetToolbarOptions
	}
}
