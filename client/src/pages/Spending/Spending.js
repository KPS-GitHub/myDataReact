import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { LineChart, PieChart, Legend } from "react-easy-chart";
import moment from "moment";

class SpendingPage extends Component {
    state = {
        spending: [],
        amount: "",
        category: "",
        date: "",
        dataArr: []
    };

    componentDidMount() {
        this.loadSpending();
        this.loadLineChartData();
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

    // this function converts the date from mongodb into 

    loadLineChartData = () => {
        let dataObjPH = {};
        let categoryArr = [];
        let lineChartDataArr = [];
        API.getSpendings({
            where:
                {userID: sessionStorage.userID}
        })
        .then(res => {
            // create array of categories
            for (let i=0; i<res.data.length; i++) {
                if (categoryArr.indexOf(res.data[i].category) === -1) {
                    categoryArr.push(res.data[i].category);
                }
            }
            // now we have categoryArr=["coffee","lunch",...] (maybe not exactly in this order, but this is what it looks like)

            // make starter array of arrays for lineChartDataArr
            for (let i=0; i<categoryArr.length; i++) {
                lineChartDataArr.push([]);
            }

            // fill out lineChartDataArr with date and amount entries
            // loop through every retrieved data point
            for (let i=0; i<res.data.length; i++) {
                // loop through the category array as a reference for grouping data points, by category, into arrays, all of which are stored in lineChartDataArr
                for (let j=0; j<categoryArr.length; j++) {
                    if (res.data[i].category === categoryArr[j]) {
                        lineChartDataArr[j].push(
                            [
                                moment(res.data[i].date).format("D-MMM-YY") ,
                                res.data[i].amount
                            ]
                        );
                    }
                }
            }
            // lineChartDataArr looks like: [[category 1 data points],[cat 2 dp's],[cat 3 dp's],...]
            // -each data point looks like: [date, amount]

            // load each data point into an object to match required react-easy-chart format
            // -this changes data points from [date, amount] to {x: date, y: amount}
            let dataEntry = {};
            let dataArr = [];
            for (let i=0; i<lineChartDataArr.length; i++) {
                let categoryData = [];
                for (let j=0; j<lineChartDataArr[i].length; j++) {
                    dataEntry = {x: lineChartDataArr[i][j][0], y: lineChartDataArr[i][j][1]};
                    categoryData.push(dataEntry);
                }
                dataArr.push(categoryData);
            }
            this.setState({dataArr: dataArr});
            console.log(this.state.dataArr);
        });
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
                        <Col size="lg-12">
                        <LineChart
                            xType={'time'}
                            axes
                            margin={{top: 50, right: 50, bottom: 50, left: 50}}
                            axisLabels={{x: 'Date', y: 'Amount ($)'}}
                            width={600}
                            interpolate={'linear'}
                            height={400}
                            data={this.state.dataArr}
                            style={{ '.label': { fill: 'black' } }}
                        />
                        </Col>
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