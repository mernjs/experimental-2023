import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from './Button';
import TextInput from './TextInput'
import useAuth from '../useAuth';
import useFetch from '../useFetch';


const SignupForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });
	const url = `http://10.10.1.72:8080/api/v1/auth/signup`
    
	const { signUp } = useAuth()
	const { executeFetch, data, error, isPending } = useFetch(url, { immediate: false })
    
	const onSubmit = async (values) => {
		signUp(values)
		await executeFetch(values)		
	}

	return (
		<div>
			<form onSubmit={handleSubmit((values) => onSubmit(values))}>
				<Controller
					name="name"
					control={control}
					render={(field) => (
						<TextInput
							{...field}
							type="text"
							placeholder="Enter Your Name"
							errors={errors}
						/>
					)}
					rules={{ required: 'Name is required.' }}
				/>

				<Controller
					name="username"
					control={control}
					render={(field) => (
						<TextInput
							{...field}
							type="text"
							placeholder="Enter Your Username"
							errors={errors}
						/>
					)}
					rules={{ required: 'Username is required.' }}
				/>

				<Controller
					name="email"
					control={control}
					render={(field) => (
						<TextInput
							{...field}
							type="text"
							placeholder="Enter Your Email"
							errors={errors}
						/>
					)}
					rules={{ required: 'Email is required.' }}
				/>
				<Controller
					name="password"
					control={control}
					render={(field) => (
						<TextInput
							{...field}
							type="password"
							placeholder="Enter Your Password"
							errors={errors}
						/>
					)}
					rules={{ required: 'Password is required.' }}
				/>
				<Button
					disabled={isSubmitting}
					className="btn btn-secondary"
					type="submit"
				>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</Button>
			</form>
		</div>
	);
};

export default SignupForm;