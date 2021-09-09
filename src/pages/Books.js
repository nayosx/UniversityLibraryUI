import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';

import { httpGet } from "../data/baseHttpHandler";
import cover from "../assets/img/book_cover.png";


const SearchBar = () => {
    return (
        <div className="table-settings mb-4">
            <Row className="justify-content-between align-items-center">
                <Col xs={9} lg={4} className="d-flex">
                    <InputGroup className="me-2 me-lg-3">
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faSearch} />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Search" />
                    </InputGroup>
                    <Form.Select className="w-25">
                        <option defaultChecked>All</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                        <option value="3">Pending</option>
                        <option value="3">Canceled</option>
                    </Form.Select>
                </Col>
                <Col xs={3} lg={8} className="text-end">
                    <Dropdown as={ButtonGroup} className="me-2">
                        <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm icon-gray">
                                <FontAwesomeIcon icon={faSlidersH} />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right">
                            <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                            <Dropdown.Item className="d-flex fw-bold">
                                10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                            </Dropdown.Item>
                            <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                            <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm icon-gray">
                                <FontAwesomeIcon icon={faCog} />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right">
                            <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                            <Dropdown.Item className="d-flex fw-bold">
                                10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                            </Dropdown.Item>
                            <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                            <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    )
}

const Books = () => {

    useEffect(() => {
        getBooks();
    }, []);

    const [books, setBooks] = useState([]);

    const getBooks = () => {
        let books = httpGet(process.env.REACT_APP_SERVER.concat(process.env.REACT_APP_BOOKS))
        books.then(respose => {
            setBooks(respose);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="mb-4 mb-lg-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Users List</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Users List</h4>
                </div>

                <div className="btn-toolbar mb-2 mb-md-0">
                    <Button variant="primary" size="sm">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New User
                    </Button>
                    <ButtonGroup className="ms-3">
                        <Button variant="outline-primary" size="sm">Share</Button>
                        <Button variant="outline-primary" size="sm">Export</Button>
                    </ButtonGroup>
                </div>
            </div>

            <SearchBar />


            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body>
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                            <th className="border-bottom">Titulo</th>
                                <th className="border-bottom">ISBN</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books && books.map(book => (
                                    <tr key={book.id}>
                                        <td>
                                        <Card.Link className="d-flex align-items-center">
                                            <Image src={cover} className="user-avatar rounded me-3" />
                                            <div className="d-block">
                                                <span className="fw-bold">{book.title}</span>

                                            </div>
                                        </Card.Link>
                                        </td>
                                        <td><span className="fw-normal"><div className="small text-gray">{book.isbn}</div></span></td>
                                        <td><span className="fw-normal"></span></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};


export default Books;