
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Form';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: '50%',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

function App() {
	const [users, setUsers] = useState([])
	const [modalIsOpen, setIsOpen] = React.useState(false);

	const openModal = () => {
		setIsOpen(true);
	}

	const closeModal = () => {
		setIsOpen(false);
	}

	const getUsers = () => {
		axios({
			method: 'get',
			url: 'http://mern.co.in/api/v1/users?page=1',
		})
			.then(function (response) {
				console.log(response)
				setUsers(response.data.data.users)
			}).catch((err) => {
				console.log(err)
			})
	}

	const addUser = (values) => {
		axios({
			method: 'post',
			url: 'http://mern.co.in/api/v1/users',
			data: values
		})
			.then(function (response) {
				console.log(response)
				setUsers([response.data.data, ...users])
				closeModal()
			}).catch((err) => {
				console.log(err)
			})
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal">
				<Form onSubmit={addUser} onClose={closeModal} />
			</Modal>
			<div className="container">
				<h1 className='text-center'>Crud App <button className='btn btn-primary float-end me-5 mt-3' onClick={openModal}>Add New</button></h1>
				<table className='table table-hover'>
					<thead>
						<tr>
							<th>Sr No.</th>
							<th>Name</th>
							<th>Email</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{
							users.map((item, i) => {
								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{item.name}</td>
										<td>{item.email}</td>
										<td>
											<button className='btn btn-success'>Edit</button>
											<button className='btn btn-danger ms-2'>Delete</button>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>

			</div>
		</>

	);
}

export default App;
