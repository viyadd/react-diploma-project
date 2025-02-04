import { useMatch } from "react-router-dom";

export type RoutePathKeyList = 'main' | 'projects' | 'analytics' | 'users'

export const useCurrentRoute = (list: Record<RoutePathKeyList, string>) => {
	const isCurrent = {
		main: useMatch(list.main),
		projects: useMatch(list.projects),
		analytics: useMatch(list.analytics),
		users: useMatch(list.users),
	};

	return {
		isActive: (key: RoutePathKeyList) => (isCurrent[key])
	}
}
