import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
// import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class Home extends Component {
    // state = {};

    render() {
        return(
            <Container fluid>
                <Nav />
                <Container fluid>
                    <Row>
                        {<h1>this will be the user data summary/dashboard</h1>}
                        {/* dashboard goes here */}
                    </Row>
                </Container>
            </Container>
        );
    };
};


export default Home;