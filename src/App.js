import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { history } from './Utilities';
import { store, persistor } from './Store';

import ReportForm from './pages/ReportForm';
import NotFound from './pages/NotFound';

const AuthRoute = ({ children }) => {
	const user = useSelector((state) => state.auth.user);
	return user !== null ? <Navigate to="/" /> : children;
};
AuthRoute.propTypes = {
	children: PropTypes.element,
};

const PrivateRoute = ({ children }) => {
	const user = useSelector((state) => state.auth.user);
	return user !== null ? children : <Navigate to={{ pathname: '/login' }} />;
};
PrivateRoute.propTypes = {
	children: PropTypes.element,
};

const AppRoutes = () => {
	return (
		<Router history={history}>
			<Routes>
				<Route
					exact={true}
					path="/"
					element={
						<AuthRoute>
							<ReportForm />
						</AuthRoute>
					}
				/>
				<Route exact={true} path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppRoutes />
				<ToastContainer />
			</PersistGate>
		</Provider>
	);
};

export default App;
