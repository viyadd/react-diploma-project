import { ActionType } from '../actions';

export interface InitialAppStateData {
	wasLogout: boolean
}
const initialAppState: InitialAppStateData = {
  wasLogout: false,
};

export const appReducer = (state = initialAppState, action: { type: ActionType; payload: InitialAppStateData; }) => {
  switch (action.type) {
    case ActionType.Logout:
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };
    default:
      return state;
  }
};
