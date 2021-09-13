import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from '@themesberg/react-bootstrap';
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';

//table
import Table from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator";
import * as Paginator from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

//confirm
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//work
import { envi } from "../../environment";
import { getRol, httpDelete, httpGet } from "../../data/baseHttpHandler";
import { Routes } from "../../routes";

const Books = () => {

    const environment = envi.pages.librarian.books;
    const redirectTo = Routes.Books.path;
    const propNameToChange = environment.propNameToChange;
    const MAX_TEXT = envi.datatable.max_text;

    const [rows, setRows] = useState([]);

    const history = useHistory();

    useEffect(() => {
        checkIsValidSessionForLibrarian();
    }, []);

    const checkIsValidSessionForLibrarian = () => {
        if(getRol() > 0 && getRol() == envi.pages.librarian.id) {
            getData();
        } else {
            history.push(Routes.UnauthorizedPage.path);
        }
    };

    const getData = () => {
        httpGet(environment.url)
            .then(response => {
                setRows([...response]);
            })
            .catch(error => {
                setRows([]);
            });
    }

    const deleteData = (id = 0) => {
		if(id > 0) {
			let url = `${environment.url}/${id}`;
			httpDelete(url)
			.then(response => {
				getData();
				SwalDeleteWarning.fire(
					environment.texts.deleteSucces,
					environment.texts.deleteSuccesText,
					'success'
				);
			})
			.catch(error => {
				getData();
				SwalDeleteWarning.fire(
					environment.texts.deleteCancelled,
					environment.texts.deleteCancelledText,
					'error'
				);
			});
		} else {
			console.log('Mostrar error aca');
		}
	}

	const SwalDeleteWarning = withReactContent(Swal.mixin({
		customClass: {
		  confirmButton: 'btn btn-primary me-3',
		  cancelButton: 'btn btn-gray'
		},
	}));

	const handlerCreate = () => {
        history.push(`${redirectTo}/create`);
	}

	const handlerEdit = (props) => {
        history.push(`${redirectTo}/${props.id}`);
	};

	const handlerDelete = async (props) => {

		await SwalDeleteWarning.fire({
			icon: 'warning',
			title: environment.texts.deleteWarning,
			text: environment.texts.deleteInfo,
			buttonsStyling: false,
			showCancelButton: true,
			confirmButtonText: environment.texts.deleteConfirmBtn
			// footer: '<a href="#do-something">Why do I have this issue?</a>'
		})
		.then((result) => {
			if(result.isConfirmed) {
				deleteData(props.id);
			} else {
				SwalDeleteWarning.fire(
					environment.texts.deleteCancelled,
					environment.texts.deleteCancelledText,
					'error'
				);
			}
		});
	};

    const columns = [
        { dataField: "id", text: "ID", hidden: true },
		{ dataField: "isbn", text: "ISBN" },
        { dataField: "title", text: "Title", formatter: (rowContent, row) =>{
            let extraText = (row.title.length >= MAX_TEXT) ? envi.datatable.texts.viewDetail : '';
			return `${row.title.substring(0, MAX_TEXT)} ${extraText}`;
		} },
        { dataField: "stock", text: "Stock" },
        { dataField: "stockActual", text: "Actual Stock" },
        /* { dataField: "description", text: "Description", formatter: (rowContent, row) => {
            let extraText = (row[propNameToChange].length >= MAX_TEXT) ? envi.datatable.texts.viewDetail : '';
            return `${row[propNameToChange].substring(0, MAX_TEXT)} ${extraText}`;
        }}, */
        {
			dataField: 'action',
			text: 'ACTION',
			formatter: (rowContent, row) => {
				return (
					<div className="btn-group" role="group">
						<Button variant="info" type="button" className="btn btn-sm" onClick={() => handlerEdit(row)}>
							{envi.btn.texts.edit} {environment.single}
						</Button>
						<Button variant="danger" type="button" className="btn btn-sm" onClick={() => handlerDelete(row)}>
							{envi.btn.texts.delete} {environment.single}
						</Button>
					</div>
				)
			}
		}
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
            <hr />
			<div className="d-flex justify-content-between mb-3">
				<Col xs="auto">
					<h3>
						List of {environment.title}
					</h3>
				</Col>
				<Col xs="auto">
					<Button variant="success" type="button" onClick={() => handlerCreate()}>
                    {envi.btn.texts.create} {environment.single}
					</Button>
				</Col>
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

export default Books;