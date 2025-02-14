export interface AppComponentsPropsBase {
	className?: string;
}

export interface AppComponentsProps extends AppComponentsPropsBase{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any;
}
export interface AppComponentsOptionsProps extends AppComponentsPropsBase{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children?: any;
}
