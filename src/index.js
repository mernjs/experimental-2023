import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'
import GoogleButton from './components/GoogleButton'
import FacebookButton from './components/FacebookButton'
import ResetPasswordForm from './components/ResetPasswordForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ForgotPasswordVerifyOTPForm from './components/ForgotPasswordVerifyOTPForm';

import useAuth from './useAuth';
import withAuth from './withAuth';

import Random from './components/Random';


export default useAuth

export {
	withAuth,
	LoginForm,
	SignupForm,
	GoogleButton,
	FacebookButton,
	ResetPasswordForm,
	ForgotPasswordForm,
	ForgotPasswordVerifyOTPForm,
	Random
	
};