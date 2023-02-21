import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from './Button';
import TextInput from './TextInput'
import useAuth from '../useAuth';

const ForgotPasswordForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });

	const { forgotPassword } = useAuth()

	const onSubmit = (values) => {
		forgotPassword(values)
	}

	return (
		<div>
			<form onSubmit={handleSubmit((values) => onSubmit(values))}>
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

export default ForgotPasswordForm;