import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form } from '@themesberg/react-bootstrap';

// table
import Table from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator";
import * as Paginator from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { envi } from "../../environment";
import { httpGet } from "../../data/baseHttpHandler";

const Genders = () => {
    
    const environment = envi.pages.librarian.genders;
    const propNameToChange = 'description'
    const MAX_TEXT = 60;
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        httpGet(environment.url)
            .then(response => {
                console.log(response);
                response.map(data => {
                    if(data[propNameToChange]) {
                        let extraText = (data[propNameToChange].length >= MAX_TEXT) ? '... View detail for show all' : '';
                        data.shortText = `${data[propNameToChange].substring(0, MAX_TEXT)} ${extraText}`;
                    }
                });
                setRows([...response]);
            })
            .catch(error => {
                console.log(error);
                setRows([]);
            });
    }

    const columns = [
        { dataField: "id", text: "ID", hidden: true },
        { dataField: "name", text: "Name" },
        { dataField: "shortText", text: "Biography" }
    ];

    const customTotal = (from, to, size) => (
        <div>
            Showing {from} to {to} of {size} entries
        </div>
    );


    const customSizePerPage = (props) => {
        const { options, currentSizePerPage, onSizePerPageChange } = props;

        const onPageChange = (e) => {
            const page = e.target.value;
            onSizePerPageChange(page);
        }

        return (
            <Row>
                <Col xs="auto">
                    <Form.Select value={currentSizePerPage} onChange={onPageChange} className="pe-5">
                        {options.map(o => (
                            <option key={o.page} value={o.page}>
                                {o.text}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs="auto" className="d-flex align-items-center">
                    entries per page
                </Col>
            </Row>
        );
    };

    return (
        <>
            <div>
                <h3>
                    List of {environment.title}
                </h3>
            </div>
            <ToolkitProvider
                keyField="id"
                search={true}
                columns={columns}
                data={rows}
                wrapperClasses="table-responsive"
            >
                {({ baseProps, searchProps }) => (
                    <Paginator.PaginationProvider pagination={
                        Pagination({
                            custom: true,
                            showTotal: true,
                            alwaysShowAllBtns: true,
                            totalSize: rows.length,
                            paginationTotalRenderer: customTotal,
                            sizePerPageRenderer: customSizePerPage
                        })
                    }>
                        {({ paginationProps, paginationTableProps }) => (
                            <Card>
                                <div className="table-responsive py-2">
                                    <Card.Header>
                                        <Row>
                                            <Col xs={12} md={6} className="py-1">
                                                <Paginator.SizePerPageDropdownStandalone {...paginationProps} />
                                            </Col>
                                            <Col xs={12} md={6} className="d-flex justify-content-md-end py-1">
                                                <Search.SearchBar {...searchProps} />
                                            </Col>
                                        </Row>
                                    </Card.Header>

                                    <Table {...baseProps} {...paginationTableProps} />

                                    <Card.Footer>
                                        <Row>
                                            <Col xs={12} md={6} className="d-flex align-items-center py-1">
                                                <Paginator.PaginationTotalStandalone {...paginationProps} />
                                            </Col>
                                            <Col xs={12} md={6} className="d-flex justify-content-md-end align-items-center mb-0 py-1">
                                                <Paginator.PaginationListStandalone {...paginationProps} />
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </div>
                            </Card>
                        )}
                    </Paginator.PaginationProvider>
                )}
            </ToolkitProvider>
        </>
    );
}

export default Genders;