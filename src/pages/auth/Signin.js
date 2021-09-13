import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import { Routes } from "../../routes";

import BgImage from "../../assets/img/illustrations/signin.svg";
import { httpPost, httpGet, clearLocalDatabase, setToken, setRol } from "../../data/baseHttpHandler";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import {logout, saveUserAuth} from '../../redux/actions/AuthActions';
import {envi} from '../../environment';
 
export default () => {

	const environment = envi.pages.login;
	const [email, setEmail] = useState(environment.defaultObj.email);
	const [password, setPassword] = useState(environment.defaultObj.password);

	const [messageError, setMessageError] = useState("");
	const [isError, setIsError] = useState(false);

	const [isDisabledBtn, setIsDisabledBtn] = useState(false);
	const [messageBtn, setMessageBtn] = useState(environment.texts.btnLogin);

	const history = useHistory();
	const dispatch = useDispatch();


	useEffect(() => {
		deleteData();
	}, []);


	const deleteData = () => {
		clearLocalDatabase();
		dispatch(logout());
	}

	const enableBtn = () => {
		setIsDisabledBtn(false);
		setMessageBtn(environment.texts.btnLogin);
	}

	const disableBtn = () => {
		setIsDisabledBtn(true);
		setMessageBtn(environment.texts.btnLoginPleaseWaiting);
	}

	const submitForm = (e) => {
		e.preventDefault();
		setIsError(false);

		disableBtn();

		httpPost(environment.auth, { email,password }, false)
		.then(data => {
			if(data) {
				let user = jwt_decode(data.auth_token);
				dispatch(saveUserAuth(user));
				setToken(data.auth_token);
				setRol(user.rol);
				console.log(user);

				if(user.rol == envi.pages.librarian.id) {
					history.push(Routes.Books.path);
				} else {
					history.push(Routes.Student.path);
				}
			} else {
				setIsError(true);
				setMessageError(environment.texts.errorCredentials);
			}
			
			enableBtn();
		})
		.catch((error) => {
			setIsError(true);
			if(error.message !== undefined) {
				setMessageError(environment.texts.errorCredentials);
			} else {
				setMessageError(envi.form.texts.errorServer);
			}
			enableBtn();
		});
	}

	return (
		<main>
			<section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
				<Container>
					<Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
						<Col xs={12} className="d-flex align-items-center justify-content-center">
							<div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
								<div className="text-center text-md-center mb-4 mt-md-0">
									<h3 className="mb-0">Sign in to our library</h3>
								</div>
								<Form className="mt-4" onSubmit={submitForm}>
									<Form.Group id="email" className="mb-4">
										<Form.Label>Your Email</Form.Label>
										<InputGroup>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faEnvelope} />
											</InputGroup.Text>
											<Form.Control
												required 
												autoFocus 
												type="email" 
												placeholder="example@university.com"
												name="email"
												value={email}
												onChange={(e)=> setEmail(e.target.value)}
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group>
										<Form.Group id="password" className="mb-4">
											<Form.Label>Your Password</Form.Label>
											<InputGroup>
												<InputGroup.Text>
													<FontAwesomeIcon icon={faUnlockAlt} />
												</InputGroup.Text>
												<Form.Control 
													required 
													type="password" 
													placeholder="Password" 
													name="password"
													value = {password}
													onChange={(e)=>setPassword(e.target.value)}
												/>
											</InputGroup>
										</Form.Group>
									</Form.Group>
									<Button variant="primary" type="submit" className="w-100" disabled={isDisabledBtn}>
										{messageBtn}
									</Button>
								</Form>

								<div className="mt-3 mb-4 text-center">
									{ isError && 
										<div className="alert alert-danger" role="alert">
											{messageError}
									  	</div>
									}
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
};
