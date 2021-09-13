import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { envi } from "../../environment";
import { Routes } from "../../routes";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { httpGet, setBook } from "../../data/baseHttpHandler";
import cover from '../../assets/img/book_cover.png';

const Student = () => {

    const environment = envi.pages.student.search;
    const redirectToList = Routes.Student.path;
    toastr.options = envi.toastConfig;
    const defaultData = environment.defaultObj;

    const [data, setData] = useState(defaultData);
    const history = useHistory();

    const [booksSearch, setBooksSearch] = useState([]);
    const [books, setBooks] = useState([]);

    const [isNotResult, setIsNotResult] = useState(false);


    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        let request = httpGet(environment.url);
        request.then(response => {
            setBooks([...response]);
        })
        request.catch(error => {
            setBooks([...[]]);
        });
    };

    const handlerBookDetails = (book) => {
        setBook(book);
        history.push(Routes.StudentBookDetails.path);
    };

    return (
        <>
            <hr />
			<div className="d-flex justify-content-between mb-3">
				<Col xs="auto">
					<h3>
						List of {environment.title}
					</h3>
				</Col>
			</div>

            <Formik
                enableReinitialize={true}
                initialValues={data}
                validate={values => {
                    const errors = {};
                    if (!values.search) {
                        errors.search = environment.texts.nameRequired;
                    } else if (
                        !/^[a-zA-Z0-9\s]+$/i.test(values.search)
                    ) {
                        errors.search = environment.texts.validName;
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setIsNotResult(false);
                    toastr.clear();
                    let url = `${environment.url}?search=${values.search}&searchType=${values.searchType}`;
                    let request = httpGet(url);
                    request.then(response => {
                        if(response.length == 0) {
                            setIsNotResult(true);
                        }
                        setSubmitting(false);
                        setBooksSearch([...response]);
                    })
                    request.catch(error => {
                        console.log(error);
                        setSubmitting(false);
                        setBooksSearch([...[]]);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <div className="col-md-12 ">
                        <div className="login-form bg-white mt-4 p-4">
                            <Form className="row g-3">
                                <div className="input-group mb-3">
                                    
                                    <Field type="text" name="search" className="form-control" placeholder="Search books" />
                                    <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary">
                                        Search
                                    </button>
                                </div>
                                <ErrorMessage name="search" component="div" className="text-danger" />
                            </Form>

                            <div className="row d-flex align-items-center">
                                {booksSearch.length > 0 && <h3>Results</h3>}
                                {isNotResult && <h3>No result :(</h3>}
                                {booksSearch.map((book, index) => {
                                return (
                                    <div key={book.id} className="col-sm-3 mb-3">
                                        <div className="card" >
                                            <img src={cover} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{book.title.substring(0, 20)}...</h5>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <button onClick={() => handlerBookDetails(book)} type="button" className="btn btn-primary">
                                                    Go details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                })}
                            </div>
                        </div>
                    </div>
                    
                )}
            </Formik>
            <div className="row mt-3">
                <hr />
                <div className="col-md-12">
                    <h3>Newly arrived books</h3>
                </div>
                <div className="col-md-12">
                    <div className="row d-flex align-items-center">
                    {books.map(book => (
                        <div key={book.id} className="col-sm-3 mb-3">
                            <div className="card" >
                                <img src={cover} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{book.title.substring(0, 20)}...</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <button onClick={() => handlerBookDetails(book)} type="button" className="btn btn-primary">
                                        Go details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Student;
