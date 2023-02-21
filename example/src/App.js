import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetForgotPassword from './pages/ResetForgotPassword';
import ForgotPasswordVerifyOTP from './pages/ForgotPasswordVerifyOTP';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					exact={true}
					path="/"
					element={
						<Dashboard />
					}
				/>
				<Route
					exact={true}
					path="/login"
					element={
						<Login />
					}
				/>
				<Route
					exact={true}
					path="/signup"
					element={
						<Signup />
					}
				/>
				<Route
					exact={true}
					path="/forgot-password"
					element={
						<ForgotPassword />
					}
				/>
				<Route
					exact={true}
					path="/reset-password"
					element={
						<ResetForgotPassword />
					}
				/>
				<Route
					exact={true}
					path="/verify-otp"
					element={
						<ForgotPasswordVerifyOTP />
					}
				/>
				<Route exact={true} path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
