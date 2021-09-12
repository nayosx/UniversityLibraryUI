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


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

// pages
// librarian
import Authors from './librarian/Authors';
import Books from './librarian/Books';
import Genders from './librarian/Genders';
import Loans from './librarian/Loans';
import Students from './librarian/Students';

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

		{/* pages */}

		{/*Student */}
		<RouteWithSidebar exact path={Routes.Student.path} component={Student} />
		<RouteWithSidebar exact path={Routes.StudentCart.path} component={StudentCart} />

		{/*librarian*/}
		<RouteWithSidebar exact path={Routes.Authors.path} component={Authors} />
		<RouteWithSidebar exact path={Routes.Books.path} component={Books} />
		<RouteWithSidebar exact path={Routes.Genders.path} component={Genders} />
		<RouteWithSidebar exact path={Routes.Loans.path} component={Loans} />
		<RouteWithSidebar exact path={Routes.Students.path} component={Students} />

		<Redirect to={Routes.NotFound.path} />
	</Switch>
);
