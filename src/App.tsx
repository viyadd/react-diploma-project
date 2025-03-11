import styled from 'styled-components';
import { Header } from './components';
import { Route, Routes } from 'react-router';
import { Authorization, Project, Projects, Registration, Task, Users } from './pages';
// import { useLayoutEffect } from 'react';
// import { setAccessRole, setUser } from './actions';
// import { useAppDispatch } from './hooks/use-app-store';

const Page = styled.div``;

function App() {
	// const dispatch = useAppDispatch();

	// useLayoutEffect(() => {
	// 	const currentUserDataJSON = sessionStorage.getItem('userData');

	// 	if (!currentUserDataJSON) {
	// 		return;
	// 	}

	// 	const currentUserData = JSON.parse(currentUserDataJSON);

	// 	dispatch(setUser(currentUserData));
	// 	dispatch(setAccessRole(currentUserData));
	// }, [dispatch]);
	return (
		<div>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/analytics" element={<div>Аналитика</div>} />
					<Route path="/users" element={<Users />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/project" element={<Project />} />
					<Route path="/project/:id" element={<Project />} />
					<Route path="/project/:id/edit" element={<Project />} />
					<Route path="/task/:id" element={<Task />} />
					<Route path="/task/:id/add" element={<div>Добавить новую работу к задаче</div>} />
					<Route path="/task/:id/edit" element={<Task />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
		</div>
	);
}

export default App;
