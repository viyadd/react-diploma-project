import styled from 'styled-components';
import { Button } from '../button/button';
import { AppComponentsPropsBase } from '@/types';

interface FormElementsCommonProps extends AppComponentsPropsBase {
	error?: string;
	disabledCancel?: boolean;
	disabledSubmit?: boolean;
	onCancel: () => void;
	onSubmit: () => void;
}

const FormElementsCommonContainer = ({
	className,
	error,
	disabledSubmit,
	disabledCancel,
	onCancel,
	onSubmit,
}: FormElementsCommonProps) => {
	return (
		<div className={className}>
			<div className="error">{error}</div>
			<div className="buttons">
				<Button onClick={onCancel} width="45%" disabled={disabledCancel}>
					Отменить
				</Button>
				<Button onClick={onSubmit} disabled={disabledSubmit} width="45%">
					Сохранить
				</Button>
			</div>
		</div>
	);
};

export const FormElementsCommon = styled(FormElementsCommonContainer)`
	display: flex;
	flex-direction: column;
	gap: 13px;

	& .buttons {
		display: flex;
	}

	& .error {
		font-size: 16px;
		color: #e73131;
		height: 30px;
	}
`;
