import { useEffect, useRef } from 'react';
import { Button } from '../button/button';
import styled from 'styled-components';
import { AppComponentsProps } from '../../types';

interface DialogProps extends AppComponentsProps {
	open: boolean;
	type?: 'info';
	onConfirm: () => void;
	onCancel: () => void;
}

const DialogContainer = ({
	className,
	type,
	open,
	onConfirm,
	onCancel,
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

	return (
		<dialog className={className} ref={dialogRef}>
			<div className="overlay"></div>
			<div className="box">
				<div className="message">{children}</div>
				<div className="buttons">
					{type === 'info' && (
						<Button width="240px" onClick={onConfirm}>
							Ok
						</Button>
					)}
					{type !== 'info' && (
						<>
							<Button width="120px" onClick={onConfirm}>
								Да
							</Button>
							<Button width="120px" onClick={onCancel}>
								Отмена
							</Button>
						</>
					)}
				</div>
			</div>
		</dialog>
	);
};

export const Dialog = styled(DialogContainer)`
	width: 400px;
	padding: 0 20px 20px;
	text-align: center;
	background-color: #fff;
	border: 1px solid #666;

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
