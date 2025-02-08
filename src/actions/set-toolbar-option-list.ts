import { ToolbarOptions } from "../shared/interfaces";
import { ActionType } from "./action-type";

export const setToolbarOptionList = (toolbarOptions?: ToolbarOptions[]) => ({
	type: ActionType.SetToolbarOptions,
	payload: { toolbarOptions: toolbarOptions ? toolbarOptions : [] },
});
