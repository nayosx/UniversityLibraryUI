import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form } from '@themesberg/react-bootstrap';

// table
import Table from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator";
import * as Paginator from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { envi } from "../../environment";
import { httpGet } from "../../data/baseHttpHandler";

const Loans = () => {
    return (
        <>
            <p>Pagina de prestamos</p>
        </>
    );
}

export default Loans;