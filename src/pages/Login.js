import React from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginForm } from 'react-auth';

const Login = () => {
	return (
		<>
			<ScrollView>
				<Header />
				<Container>
					<H2>Sign In</H2>
					<LoginForm />
					<div>
						Already have an account?{' '}
						<Link to="/signup">Signup</Link>
					</div>
				</Container>
			</ScrollView>
			<Footer />
		</>
	);
};

export default Login;

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
