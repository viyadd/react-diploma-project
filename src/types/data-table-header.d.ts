import { DateFormat } from "../utils";

export interface DataTableTool {
	key: string,
	iconId: string,
	onClick: (value: unknown, key: string) => void
}

export interface DataTableHeader {
	key: string,
	text?: string,
	type?: DateFormat,
	// width?: number,
	// link?:  LinkFn,
	link?: (v: unknown) => string,
}

interface DataTableHeaderWithTools extends DataTableHeader {
	tools?: DataTableTool[]
}

export function isDataTableToolboxUndefined(val: DataTableTool): val is undefined {
	return val === undefined
}
