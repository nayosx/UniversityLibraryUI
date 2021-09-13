import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { envi } from "../../environment";
import { httpGet, httpPost, httpPut } from "../../data/baseHttpHandler";
import { Routes } from "../../routes";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const StudentCreateOrEdit = (props) => {

    const environment = envi.pages.librarian.students;
    const redirectToList = Routes.Students.path;
    toastr.options = envi.toastConfig;

    const history = useHistory();
    const defaultData = environment.defaultObj;

    const [id, setId] = useState(0);
    const [titleForm, setTitleForm] = useState(`${envi.btn.texts.create} ${environment.single}`);
    const [data, setData] = useState(defaultData);
    const [isCreated, setIsCreated] = useState(false);

    const [messageError, setMessageError] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        checkIdFromParams();
    }, []);

    const checkIdFromParams = () => {
        const id = parseInt(props.match.params.id);
        if(isNaN(id)) {
            setTitleForm(`${envi.btn.texts.create} ${environment.single}`);
            setIsCreated(true);
        } else {
            setTitleForm(`${envi.btn.texts.update} ${environment.single}`);
            setIsCreated(false);
            getData(id);
        }
    };

    const getData = (id = 0) => {
        if(id > 0 ) {
            let url = `${environment.url}/${id}`;
            httpGet(url)
            .then(response =>{
                console.log(response);
                setId(response.id);
                delete(response.created_at);
                delete(response.id);
                delete(response.updated_at);
                setData(response);
            })
            .catch(error => {
                history.push(redirectToList);
                toastr.error(envi.form.texts.errorServer);
            });
        } else {
            setData(defaultData);
            history.push(redirectToList);
        }
    };

    const handlerBack = () => {
        history.push(redirectToList);
    }

    return (
        <div>
            <hr />
            <h3>{titleForm}</h3>
            <Formik
                enableReinitialize={true}
                initialValues={data}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = environment.texts.nameRequired;
                    } else if (
                        !/^[a-zA-Z0-9\s]+$/i.test(values.name)
                    ) {
                        errors.name = environment.texts.validName;
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    toastr.clear();
                    setIsError(false);
                    let request = null;
                    let url = '';
                    if(isCreated) {
                        values.rol_id = 1;
                        values.password = '1234';
                        values.password_confirmation = values.password;

                        url = environment.url;
                        request = httpPost(url, {user: values});
                    } else {
                        url = `${environment.url}/${id}`;
                        request = httpPut(url, values);
                    }

                    request.then(response => {
                        setSubmitting(false);
                        history.push(redirectToList);
                        toastr.success(`${titleForm}`);
                    })
                    request.catch(error => {
                        console.log(error);
                        setSubmitting(false);
                        setIsError(true);
                        setMessageError(envi.form.texts.errorServer);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <div className="col-md-6">
                        <div className="login-form bg-white mt-4 p-4">
                            <Form className="row g-3">

                                <div className="mb-3">
                                    <label htmlFor="name">Name</label>
                                    <Field type="text" name="name" className="form-control" />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </div>
    
                                <div className="mb-3">
                                    <label htmlFor="lastname">Lastname</label>
                                    <Field type="text" name="lastname" className="form-control" />
                                    <ErrorMessage name="lastname" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone">Phone</label>
                                    <Field type="phone" name="phone" className="form-control" />
                                    <ErrorMessage name="phone" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        {titleForm}
                                    </button>
                                    <button type="button" className="btn btn-default" onClick={() => handlerBack()}>
                                        {envi.btn.texts.cancel}
                                    </button>
                                </div>
                            </Form>

                            <div className="mt-3 mb-4 text-center">
                                { isError && 
                                    <div className="alert alert-danger" role="alert">
                                        {messageError}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default StudentCreateOrEdit;