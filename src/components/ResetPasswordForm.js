import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from './Button';
import TextInput from './TextInput'
import useAuth from '../useAuth';

const ResetPasswordForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });

	const { resetPassword } = useAuth()

	const onSubmit = (values) => {
		resetPassword(values)
	}

	return (
		<div>
			<form onSubmit={handleSubmit((values) => onSubmit(values))}>
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
				<Controller
					name="confirm_password"
					control={control}
					render={(field) => (
						<TextInput
							{...field}
							type="password"
							placeholder="Enter Your Confirm Password"
							errors={errors}
						/>
					)}
					rules={{ required: 'Password is confirm required.' }}
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

export default ResetPasswordForm;