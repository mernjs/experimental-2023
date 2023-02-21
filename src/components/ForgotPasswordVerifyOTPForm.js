import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from './Button';
import TextInput from './TextInput'
import useAuth from '../useAuth';

const ForgotPasswordVerifyOTPForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });

	const { forgotPasswordVerifyOTP } = useAuth()

	const onSubmit = (values) => {
		forgotPasswordVerifyOTP(values)
	}

	return (
		<div>
			<form onSubmit={handleSubmit((values) => onSubmit(values))}>
				<Controller
					name="otp"
					control={control}
					render={(field) => (
						<TextInput
							{...field}
							type="text"
							placeholder="Enter Your OTP"
							errors={errors}
						/>
					)}
					rules={{ required: 'OTP is required.' }}
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

export default ForgotPasswordVerifyOTPForm;