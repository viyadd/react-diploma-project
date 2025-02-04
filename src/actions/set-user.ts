import { AppUserData } from '../bff/constants';
import { ActionType } from './action-type';

export const setUser = (user: AppUserData) => ({
  type: ActionType.SetUser,
  payload: user,
});
