import { useEffect, useRef } from 'react';
import { Button } from '../button/button';
import styled from 'styled-components';
import { AppComponentsProps } from '../../types';
import { Title } from './components';

interface DialogProps extends AppComponentsProps {
	open: boolean;
	title?: string
	type?: 'info' | 'YesNo';
	onConfirm: () => void;
	onCancel: () => void;
}

const DialogContainer = ({
	className,
	title,
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
			{title !== undefined && <Title>{title}</Title>}
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
