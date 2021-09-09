import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import {  Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import { Routes } from "../../routes";

import BgImage from "../../assets/img/illustrations/signin.svg";
import { httpPost, httpGet } from "../../data/baseHttpHandler";


export default () => {
	let history = useHistory();
	
	const submitForm = (e) => {
		e.preventDefault();
		httpPost(process.env.REACT_APP_SERVER.concat(process.env.REACT_APP_USERS_LOGIN), 
			{
				"email": "pacoelchato@mail.com",
				"password": "k1r@"
			}
		).then(data => {
			console.log(data);
			history.push('/books');
		}).catch((error) => {
			console.log(error);
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
											<Form.Control autoFocus required type="email" placeholder="example@company.com" />
										</InputGroup>
									</Form.Group>
									<Form.Group>
										<Form.Group id="password" className="mb-4">
											<Form.Label>Your Password</Form.Label>
											<InputGroup>
												<InputGroup.Text>
													<FontAwesomeIcon icon={faUnlockAlt} />
												</InputGroup.Text>
												<Form.Control required type="password" placeholder="Password" />
											</InputGroup>
										</Form.Group>
										<div className="d-flex justify-content-between align-items-center mb-4">
											{/* <Form.Check type="checkbox">
												<FormCheck.Input id="defaultCheck5" className="me-2" />
												<FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
											</Form.Check> 
											<Card.Link className="small text-end">Lost password?</Card.Link> */}
										</div>
									</Form.Group>
									<Button variant="primary" type="submit" className="w-100">
										Sign in
									</Button>
								</Form>

								<div className="mt-3 mb-4 text-center">
									
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
};
