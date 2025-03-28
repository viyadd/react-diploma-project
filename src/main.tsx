import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import App from './App.tsx';
import './index.css';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<SnackbarProvider autoHideDuration={1000}>
				<App />
			</SnackbarProvider>
		</Provider>
	</BrowserRouter>,
);
