import { transformStatesToOptionList } from '@/utils';
import { Dialog } from '../dialog/dialog';
import { Select } from '../select/select';
import { AppComponentsPropsBase, DialogType } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useStatusList } from '@/hooks';

interface SelectStatusProps extends AppComponentsPropsBase {
	statusId: string;
	isLoading?: boolean;
	onSave: (newStatusId: string) => void;
}

export const SelectStatus = ({ statusId, isLoading, onSave }: SelectStatusProps) => {
	const [isOpenYesNo, setIsOpenYesNo] = useState(false);
	const selectRef = useRef<HTMLSelectElement>(null);

	const statusList = useStatusList();

	const handleOnStatusChange: React.ChangeEventHandler<HTMLSelectElement> = () => {
		setIsOpenYesNo(true);
	};

	useEffect(() => {
		if (selectRef.current) {
			selectRef.current.value = statusId;
		}
	}, [statusId]);

	const handleOnStatusChangeDialog = async (confirmed: boolean) => {
		if (confirmed) {
			const newStatusId = selectRef.current?.value;
			if (typeof statusId === 'string' && typeof newStatusId === 'string') {
				onSave(newStatusId);
			}
		} else {
			if (selectRef.current) {
				selectRef.current.value = statusId;
			}
		}
		setIsOpenYesNo(false);
	};

	return (
		<>
			<Select
				optionsList={transformStatesToOptionList(statusList.statusList || [])}
				loading={statusList.isStatusListLoading || !!isLoading}
				mode="compact"
				defaultValue={statusId}
				onChange={handleOnStatusChange}
				ref={selectRef}
			/>
			<Dialog
				open={isOpenYesNo}
				type={DialogType.YesNo}
				onClose={() => handleOnStatusChangeDialog(false)}
				onConfirm={() => handleOnStatusChangeDialog(true)}
			>
				Изменить текущий статус?
			</Dialog>
		</>
	);
};
