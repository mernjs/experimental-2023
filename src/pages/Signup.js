import React from 'react';
import { Header, Footer, H2 } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SignupForm } from 'react-auth';

const Signup = () => {

	return (
		<>
			<ScrollView>
				<Header />
				<Container>
					<H2>Sign Up</H2>
					<SignupForm />
					<div>
						Don&apos;t have an account?{' '}
						<Link to="/login">Login</Link>
					</div>
				</Container>
			</ScrollView>
			<Footer />
		</>
	);
};

export default Signup;

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
