import styled from 'styled-components';
import { Header } from './components';
import { Route, Routes } from 'react-router';
import { Analytics, Authorization, Info, Project, Projects, Registration, Task, Users } from './pages';
import { Main } from './pages/main/main';
import { UserRightsManagerContext } from '@/context';
import { useUserRights } from './hooks/use-user-rights';

const Page = styled.div``;

function App() {
		const userRights = useUserRights();

	return (
		<UserRightsManagerContext.Provider value={userRights}>
		<div>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/info" element={<Info />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/analytics" element={<Analytics />} />
					<Route path="/analytics/project/:id" element={<Analytics />} />
					<Route path="/users" element={<Users />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/project" element={<Project />} />
					<Route path="/project/:id" element={<Project />} />
					<Route path="/task/:id" element={<Task />} />
					<Route path="*" element={<div>Страница не существует</div>} />
				</Routes>
			</Page>
		</div>
		</UserRightsManagerContext.Provider>

	);
}

export default App;
