import React from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data: any) => console.log(data);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("email", { required: true })} /> <br /> <br />
			{errors.email && <div><span>This field is required</span> <br /> <br /></div>}
			<input {...register("password", { required: true })} /><br /> <br />
			{errors.password && <div><span>This field is required</span> <br /> <br /></div>}
			<input type="submit" />
		</form>
	);
};

export default SignupForm;