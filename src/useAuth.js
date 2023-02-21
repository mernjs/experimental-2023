const useAuth = () => {

	const signIn = async (payload) => {
		try {
			console.log("SignIn <<<<<===>>>", payload)
		} catch (error) {
			console.log("error", error)
		}
	}

	const signUp = async (payload) => {
		try {
			console.log("signUp", payload)
		} catch (error) {
			console.log("error", error)
		}
	}

	const resetPassword = async (payload) => {
		try {
			console.log("resetPassword", payload)
		} catch (error) {
			console.log("error", error)
		}
	}

	const forgotPassword = async (payload) => {
		try {
			console.log("forgotPassword", payload)
		} catch (error) {
			console.log("error", error)
		}
	}

	const forgotPasswordVerifyOTP = async (payload) => {
		try {
			console.log("forgotPasswordVerifyOTP", payload)
		} catch (error) {
			console.log("error", error)
		}
	}

	return {
		signIn,
		signUp,
		resetPassword,
		forgotPassword,
		forgotPasswordVerifyOTP
	}

}

export default useAuth