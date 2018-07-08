import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class SpendingPage extends Component {
    state = {
        spending: [],
        amount: "",
        category: "",
        date: ""
    };

    componentDidMount() {
        this.loadSpending();
    }

    loadSpending = () => {
        API.getSpendings({
            where:
                {userID: sessionStorage.userID}
            })
            .then(res =>
            this.setState({ spending: res.data, amount: "", category: "" })
            )
            .catch(err => console.log(err));
    };

    deleteSpending = id => {
        API.deleteSpending(id)
            .then(res => this.loadSpending())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.amount && this.state.category) {
            API.saveSpending({
            amount: this.state.amount,
            category: this.state.category,
            userID: sessionStorage.userID
            })
            .then(res => this.loadSpending())
            .catch(err => console.log(err));
        }
    };


    render() {
        return (
            <Container fluid>
                <Nav />
                <Row>
                    {/* spending table */}
                    <Col size="lg-4">
                    {this.state.spending.length ? (
                        <List>
                            {this.state.spending.map(purchase => (
                                <ListItem key={purchase._id}>
                                    <strong>
                                        {purchase.amount} for {purchase.category}
                                    </strong>
                                    <DeleteBtn onClick={() => this.deleteSpending(purchase._id)} />
                                </ListItem>
                            ))}
                        </List>
                        ) : (
                            <h3>No Results to Display</h3>
                    )}
                    </Col>
                    {/* graphs/data vis */}
                    <Col size="lg-8">
                    
                    </Col>
                </Row>
                <Row>
                    {/* purchase form */}
                    <Col size="lg-4">
                        <form>
                            <Input
                                value={this.state.amount}
                                onChange={this.handleInputChange}
                                name="amount"
                                placeholder="Purchase Amount (required)"
                            />
                            <Input
                                value={this.state.category}
                                onChange={this.handleInputChange}
                                name="category"
                                placeholder="Category (required)"
                            />
                            <FormBtn
                                disabled={!(this.state.amount && this.state.category)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Purchase
                            </FormBtn>
                        </form>
                    </Col>
                    {/* Summary Stats */}
                    <Col size="lg-8">
                    
                    </Col>                   
                </Row>
            </Container>
        );
    };

};


export default SpendingPage;