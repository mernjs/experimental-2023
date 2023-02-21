import React, { useEffect } from 'react';
import useAuth,{ withAuth, Random } from 'react-auth';

const Dashboard = () => {
	const { signIn } = useAuth()

	useEffect(() => {
		signIn({ email: 'email', password: '12345' })
	}, [])

	return (
		<div>
			Dashboard
			<Random />
		</div>
	);
}

export default withAuth(Dashboard);
