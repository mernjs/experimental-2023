import React from 'react';
import { useForm, Controller } from 'react-hook-form';
const Random = () => {
	// const {
	// 	handleSubmit,
	// 	control,
	// 	formState: { isSubmitting, errors },
	// } = useForm({ mode: 'onChange' });
   
	return (
		<div>
		   <span>Helloo WOrld</span>
		   <form>
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
			<input type="text"/>
			<input type="button"/>
		   </form>
		</div>
	);
};

export default Random;