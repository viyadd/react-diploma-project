import { DateFormat } from "../utils";

export interface DataTableToolOnClickFunc {
	({ key, value }: { key: string, value: unknown }): void
}
export interface DataTableToolIsDisabledFunc {
	({ key, value }: { key: string, value: unknown }): boolean
}
export interface DataTableTool {
	key: string,
	iconId: string,
	tooltip?: string,
	isDisabled?: DataTableToolIsDisabledFunc,
	onClick: DataTableToolOnClickFunc
	// onClick: ({key, value}:{key: string, value: unknown}) => void
}

export interface DataTableHeader {
	key: string,
	text?: string,
	type?: DateFormat,
	sortable?: boolean,
	sortKey?: string,
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
