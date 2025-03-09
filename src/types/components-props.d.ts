import { ReactNode } from "react";

export interface AppComponentsPropsBase {
	className?: string;
}

export interface AppComponentsProps extends AppComponentsPropsBase{
	children: ReactNode;
}
export interface AppComponentsOptionsProps extends AppComponentsPropsBase{
	children?: ReactNode;
}
