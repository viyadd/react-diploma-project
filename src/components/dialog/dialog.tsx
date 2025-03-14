import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { Button } from '../button/button';
import styled from 'styled-components';
import { AppComponentsProps, DialogType } from '@/types';
import { Title } from './components';

interface DialogProps extends AppComponentsProps {
	open: boolean;
	title?: string;
	type?: DialogType;
	width?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	onClose?: () => void;
}

const DialogContainer = ({
	className,
	title,
	type,
	open,
	onConfirm,
	onCancel,
	onClose,
	children,
}: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (open) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [open]);

	const closeDialog = () => {
		if (onCancel !== undefined) {
			onCancel();
			return;
		}
		if (onClose !== undefined) {
			onClose();
		}
	}

	const handleKeyDown: KeyboardEventHandler<HTMLDialogElement> = (e) => {
		if (e.key === 'Escape') {
			closeDialog()
		}
	};

	const handleConfirm = () => {
		if (onConfirm === undefined) {
			closeDialog();
			return
		}
		onConfirm()
	};

	const handleCancel = () => {
		closeDialog();
	};

	return (
		<dialog className={className} onKeyDown={handleKeyDown} ref={dialogRef}>
			{title !== undefined && <Title>{title}</Title>}
			<div className="box">
				<div className="message">{children}</div>
				{type !== undefined && (
					<div className="buttons">
						{type === 'info' && (
							<Button width="240px" onClick={handleConfirm}>
								Ok
							</Button>
						)}
						{['YesNo', 'SaveCancel'].includes(type) && (
							<>
								<Button width="120px" onClick={handleConfirm}>
									{type === 'YesNo' ? 'Да' : 'Сохранить'}
								</Button>
								<Button width="120px" onClick={handleCancel}>
									{type === 'YesNo' ? 'Нет' : 'Отмена'}
								</Button>
							</>
						)}
					</div>
				)}
			</div>
		</dialog>
	);
};

export const Dialog = styled(DialogContainer)`
	width: ${({ width = '400px' }) => width};
	background-color: #fff;
	border: 1px solid #999;
	padding: 0;

	& .title {
		padding: 3px 9px;
		color: #fff;
		background-color: #2682f2;
	}

	& .box {
		padding: 0 20px 20px;
		text-align: center;
	}

	& .message {
		margin: 20px 0;
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 5px;
	}
`;
