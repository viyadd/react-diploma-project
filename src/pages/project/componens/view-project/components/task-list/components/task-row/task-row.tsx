import styled from "styled-components"
import { AppComponentsPropsBase } from "../../../../../../../../types"
import { TableColumnListProps } from "../../../../../../../../types/table-column-list-props"

interface TaskRowProps extends AppComponentsPropsBase{
	items: TableColumnListProps[]
	// rows: Record<T,>[]
}

const TaskRowContainer = ({className, items}: TaskRowProps) => {
	return <>
		{items.map((item)=>{

			return (
				<div className={className}></div>

			)
		})}
	</>
}

export const TaskRow = styled(TaskRowContainer)`

`
