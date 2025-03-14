import { DataBaseUserData, isDataBaseUserDataFill } from "@/types"

interface GetUserFullNameParams {
	user?: DataBaseUserData | null
	isFill?: boolean
	emptyValue?: string

}

export const getUserFullName = ({ user, isFill, emptyValue = '-' }: GetUserFullNameParams) => {
	if (!isDataBaseUserDataFill(user)) {
		if (!isFill) {
			return ''
		} else {
			return emptyValue
		}
	}

	const { name, surname, patronymic } = user
	return [name, surname, patronymic].filter(Boolean).join(' ')
}
