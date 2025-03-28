import styled from 'styled-components';
import { AppComponentsPropsBase } from '@/types';
import { Link } from 'react-router-dom';
// import { AppUserRole } from '@/constants';

// const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const InfoContainer = ({ className }: AppComponentsPropsBase) => {
	return (
		<div className={className}>
			<div>
				<h3>Для получения доступа к приложению вам необходимо пройти <Link to='/register'>регистрацию</Link></h3>
				<h3>После регистрации дождитесь что бы администратор определил группу</h3>
			</div>
		</div>
	);
};

export const Info = styled(InfoContainer)`
	margin: 0;
	display: flex;
	justify-content: center;
	/* place-items: center; */
	min-width: 320px;
	min-height: 93vh;

	& .main-form {
		display: flex;
		width: 600px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}

	& .player-buttons {
		display: flex;
		font-size: 53px;
	}
`;
