import { AppStateData } from "../../bff/shared/model";

export const transformAppStateToOptionList = (stateList: AppStateData[]) => {
	return stateList.map((state) => {
		if (state === null) {
			return state;
		}
		const { id: key, code: value, text } = state;
		return { key, value, text };
	});
};
