import styled from "styled-components";
import { Header } from "./components";

const Page = styled.div`
`
function App() {
	return (
		<div>
			<Header />
			<Page>current page</Page>
		</div>
	);
}

export default App;
