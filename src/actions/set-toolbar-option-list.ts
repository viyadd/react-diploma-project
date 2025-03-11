import { ActionType, ToolbarOptions } from "../types";

export const setToolbarOptionList = (toolbarOptions?: ToolbarOptions[]) => ({
	type: ActionType.SetToolbarOptions,
	payload: { toolbarOptions: toolbarOptions ? toolbarOptions : [] },
});
