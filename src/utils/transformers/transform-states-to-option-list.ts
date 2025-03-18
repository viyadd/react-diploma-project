import { AppStateData } from "../../types";

export const transformStatesToOptionList = (stateList: AppStateData[]) => {
	return stateList.map((state) => {
		if (state === null) {
			return state;
		}
		const { id: key, code: value, text } = state;
		return { key, value, text };
	});
};
