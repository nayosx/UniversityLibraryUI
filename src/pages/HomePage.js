import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

import NotFoundPage from "./default/NotFound";
import ServerError from "./default/ServerError";
import Lock from "./default/Lock";
import Unauthorized from './default/Unauthorized';


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

// pages
// librarian
import Authors from './librarian/Authors';
import Author from './librarian/Author';

import Books from './librarian/Books';
import Book from './librarian/Book';

import Genders from './librarian/Genders';
import Gender from './librarian/Gender';

import Loans from './librarian/Loans';
import Loan from './librarian/Loan';

import Students from './librarian/Students';
import StudentCreateOrEdit from './librarian/Student';

// Student
import Student from './student/Student';
import StudentCart from './student/StudentCart';

const RouteWithLoader = ({ component: Component, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
	);
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	const localStorageIsSettingsVisible = () => {
		return localStorage.getItem('settingsVisible') === 'false' ? false : true
	}

	const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

	const toggleSettings = () => {
		setShowSettings(!showSettings);
		localStorage.setItem('settingsVisible', !showSettings);
	}

	return (
		<Route {...rest} render={props => (
			<>
				<Preloader show={loaded ? false : true} />
				<Sidebar />

				<main className="content">
					<Navbar />
					<Component {...props} />
					<Footer toggleSettings={toggleSettings} showSettings={showSettings} />
				</main>
			</>
		)}
		/>
	);
};

export default () => (
	<Switch>
		<RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
		<RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
		<RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
		<RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
		<RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
		<RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
		<RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
		<RouteWithLoader exact path={Routes.UnauthorizedPage.path} component={Unauthorized} />

		{/* pages */}

		{/*Student */}
		<RouteWithSidebar exact path={Routes.Student.path} component={Student} />
		<RouteWithSidebar exact path={Routes.StudentCart.path} component={StudentCart} />

		{/*librarian*/}
		<RouteWithSidebar exact path={Routes.Authors.path} component={Authors} />
		<RouteWithSidebar exact path={Routes.AuthorCreateOrEdit.path} component={Author} />

		<RouteWithSidebar exact path={Routes.Books.path} component={Books} />
		<RouteWithSidebar exact path={Routes.BookCreateOrEdit.path} component={Book} />

		<RouteWithSidebar exact path={Routes.Genders.path} component={Genders} />
		<RouteWithSidebar exact path={Routes.GenderCreateOrEdit.path} component={Gender} />

		<RouteWithSidebar exact path={Routes.Loans.path} component={Loans} />
		<RouteWithSidebar exact path={Routes.LoanDetail.path} component={Loan} />

		<RouteWithSidebar exact path={Routes.Students.path} component={Students} />
		<RouteWithSidebar exact path={Routes.StudentCreateOrEdit.path} component={StudentCreateOrEdit} />

		<Redirect to={Routes.NotFound.path} />
	</Switch>
);
