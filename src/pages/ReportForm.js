import React from 'react';
import { Header, Footer, TextInput, H2, Button } from '../components';
import styled from 'styled-components';
import { showToast } from '../Utilities';
import { useForm, Controller } from 'react-hook-form';

const ReportForm = () => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });

	const onSubmit = async (payload) => {
		try {
			window.open(`https://crcf.sbi.co.in/ccf/home/GetFeedback?TxnDate=${payload.TxnDate}&TxnType=${payload.TxnType}&JNo=${payload.JNo}`);
			showToast('Form Submitted Successfully', 'success');
			setTimeout(() => {
				reset({
					TxnDate: '',
					TxnType: '',
					JNo: '',
				});
			}, 100);
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}
	};

	return (
		<>
			<ScrollView>
				<Header />
				<Container>
					<H2>Report Form</H2> <br />
					<form onSubmit={handleSubmit((values) => onSubmit(values))}>
						<Controller
							name="TxnDate"
							control={control}
							render={(field) => (
								<TextInput
									{...field}
									type="text"
									placeholder="Enter Your Txn Date"
									errors={errors}
								/>
							)}
							rules={{ required: 'Txn Date is required.' }}
						/>
						<Controller
							name="TxnType"
							control={control}
							render={(field) => (
								<TextInput
									{...field}
									type="text"
									placeholder="Enter Your Txn Type"
									errors={errors}
								/>
							)}
							rules={{ required: 'Txn Type is required.' }}
						/>
						<Controller
							name="JNo"
							control={control}
							render={(field) => (
								<TextInput
									{...field}
									type="text"
									placeholder="Enter Your JNo"
									errors={errors}
								/>
							)}
							rules={{ required: 'JNo is required.' }}
						/>
						<Button
							disabled={isSubmitting}
							className="btn btn-secondary"
							type="submit"
						>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</Button>
					</form>
				</Container>
			</ScrollView>
			<Footer />
		</>
	);
};

export default ReportForm;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    align-content: center;
    padding-top: 50px;
    min-height: 100%;
    margin: auto;
    width: 400px;
    max-width: 100%;
`;
