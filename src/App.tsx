import styled from 'styled-components';
import { Header } from './components';
import { Route, Routes } from 'react-router';
import { Analytics, Authorization, Project, Projects, Registration, Task, Users } from './pages';
import { Main } from './pages/main/main';

const Page = styled.div``;

function App() {
	return (
		<div>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/info" element={<div>info</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/analytics" element={<Analytics />} />
					<Route path="/analytics/project/:id" element={<Analytics />} />
					<Route path="/users" element={<Users />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/project" element={<Project />} />
					<Route path="/project/:id" element={<Project />} />
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
