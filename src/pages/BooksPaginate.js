import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form } from '@themesberg/react-bootstrap';
import Table from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator";
import * as Paginator from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { httpGet } from "../data/baseHttpHandler";


const BooksPaginate = () => {

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

    const columns = [
        { dataField: "id", text: "ID", hidden: true },
        { dataField: "title", text: "Title" },
        { dataField: "isbn", text: "ISBN" }
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
        <ToolkitProvider
          keyField="id"
          search={true}
          columns={columns}
          data={books}
          wrapperClasses="table-responsive"
        >
          {({ baseProps, searchProps }) => (
            <Paginator.PaginationProvider pagination={
              Pagination({
                custom: true,
                showTotal: true,
                alwaysShowAllBtns: true,
                totalSize: books.length,
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
    );
}

export default BooksPaginate;