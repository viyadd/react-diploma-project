import styled from 'styled-components';
import { PageTitle } from '../../components';
import { useEffect } from 'react';
import { server } from '../../bff';

const UsersContainer = ({ className }: { className?: string }) => {
	useEffect(()=>{
		server.fetchUsers().then(usersRes=>{
			if (usersRes.error) {
				console.log('errore', usersRes.error)
				return
			}
			console.log('--->>>', usersRes.data)
		})
	},[])

	return (
		<div className={className}>
			<PageTitle>Список пользователей</PageTitle>
			<div>Пользователи</div>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

`;
