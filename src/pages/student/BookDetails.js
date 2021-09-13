import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import { getBook } from "../../data/baseHttpHandler";

import { envi } from "../../environment";
import { Routes } from "../../routes";

import cover from '../../assets/img/book_cover.png';

const BookDetails = () => {
    const history = useHistory();

    const redirectToList = Routes.Student.path;

    const [data, setData] = useState({});

    useEffect(() => {
        getFromLocalBook();
    }, []);

    const getFromLocalBook = () => {
        setData(getBook())
    };

    const handlerBack = () => {
        history.push(redirectToList);
    }
    return (
        <>
            <hr />
            <h3>Book details</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="login-form bg-white mt-4 p-4">

                        <div className="mb-3">
                            <img src={cover} className="card-img-top" alt="..." style={{width: '250px'}} />
                        </div>
                        
                        <div className="mb-3">
                            <p><strong>Title: <span>{data.title}</span></strong></p>
                        </div>

                        <div className="mb-3">
                            <p><strong>ISBN: <span>{data.isbn}</span></strong></p>
                        </div>
                        

                        <div className="mb-3">
                            <p><strong>Description: <span>{data.description}</span></strong></p>
                        </div>

                        <div className="mb-3">
                            <button type="button" className="btn btn-secondary" onClick={() => handlerBack()}>
                                {envi.btn.texts.back}
                            </button>
                        </div>

                    </div>
                </div>  
            </div>
        </>
    );
}

export default BookDetails;