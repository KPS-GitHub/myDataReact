import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { LineChart, PieChart, Legend, ToolTip } from "react-easy-chart";
import moment from "moment";

class SpendingPage extends Component {
    state = {
        spending: [],
        amount: "",
        category: "",
        date: "",
        dataArr: [],
        categoryArr: [],
        spendingTotal: 0,
        categorySpendingTotals: [],
        // graph-related state vars
        // showToolTip: false,
        // top: "",
        // left: "",
        // y: 0,
        // x: 0
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
                this.setState({ spending: res.data })
            )
            .catch(err => console.log(err));
    };

    deleteSpending = id => {
        API.deleteSpending(id)
            .then(res => {
                this.loadSpending()
                this.loadLineChartData()
            })
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
            .then(res => {
                this.loadSpending()
                this.loadLineChartData()
            })
            .catch(err => console.log(err));
        }
    };

    // this function converts the date from mongodb into 

    loadLineChartData = () => {
        let dataObjPH = {};
        let categoryArr = [];
        let lineChartDataArr = [];
        this.state.categorySpendingTotals = [];
        this.state.spendingTotal = 0;
        API.getSpendings({
            where:
                {userID: sessionStorage.userID}
        })
        .then(res => {
            // create array of categories
            for (let i=0; i<res.data.length; i++) {
                if (categoryArr.indexOf(res.data[i].category) === -1) {
                    categoryArr.push(res.data[i].category);
                    // add a 0 entry to categorySpendingTotals in order to have the same number of entries as categories
                    this.state.categorySpendingTotals.push(0);
                }
            }
            this.setState({categoryArr: categoryArr});
            console.log("categoryArr:", categoryArr);
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
            console.log("lineChartDataArr before reformat:",lineChartDataArr);
            // lineChartDataArr looks like: [[category 1 data points],[cat 2 dp's],[cat 3 dp's],...]
            // -each data point looks like: [date, amount]

            // calculate spending totals by category and overall, update state vars appropriately
            for (let i=0; i<lineChartDataArr.length; i++) {
                for (let j=0; j<lineChartDataArr[i].length; j++) {
                    this.state.categorySpendingTotals[i] += lineChartDataArr[i][j][1];
                    this.state.spendingTotal += lineChartDataArr[i][j][1];
                }
            }

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
                console.log("categoryData:",categoryData); //data not in chronological order - why?!?!
                dataArr.push(categoryData);
            }
            this.setState({dataArr: dataArr});
            console.log(this.state.dataArr);
        });
    };

    
    // mouseover code for line chart (doesn't compile yet)
    // mouseOverHandler(d, e) {
    //     this.setState({
    //       showToolTip: true,
    //       top: `${e.screenY - 10}px`,
    //       left: `${e.screenX + 10}px`,
    //       y: d.y,
    //       x: d.x});
    //   }
    
    //   mouseMoveHandler(e) {
    //     if (this.state.showToolTip) {
    //       this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    //     }
    //   }
    
    //   mouseOutHandler() {
    //     this.setState({showToolTip: false});
    //   }
    
    //   createTooltip() {
    //     if (this.state.showToolTip) {
    //       return (
    //         <ToolTip
    //           top={this.state.top}
    //           left={this.state.left}
    //         >
    //             The x value is {this.state.x} and the y value is {this.state.y}
    //         </ToolTip>
    //       );
    //     }
    //     return false;
    //   }

    


    render() {
        return (
            <Container fluid>
                <Nav />
                <Row>
                    {/* spending table */}
                    <Col size="lg-4">
                    <h3>mySpending</h3>
                    {this.state.spending.length ? (
                        <List>
                            {this.state.spending.map(purchase => (
                                <ListItem key={purchase._id}>
                                    <strong>
                                        {moment(purchase.date).format("MMMM Do, YYYY")} - ${purchase.amount} for {purchase.category}
                                    </strong>
                                    <DeleteBtn onClick={() => this.deleteSpending(purchase._id)} />
                                </ListItem>
                            ))}
                        </List>
                        ) : (
                            <h3>No Results to Display</h3>
                    )}
                    {/* add a purchase form */}
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
                    {/* graphs/data vis and summary data */}
                    <Col size="lg-8">
                        <Col size="lg-12">
                            <LineChart
                                xType={'time'}
                                axes
                                dataPoints
                                margin={{top: 50, right: 50, bottom: 50, left: 50}}
                                axisLabels={{x: 'Date', y: 'Amount ($)'}}
                                // mouseOverHandler={this.mouseOverHandler}
                                // mouseOutHandler={this.mouseOutHandler}
                                // mouseMoveHandler={this.mouseMoveHandler}
                                width={600}
                                height={400}
                                interpolate={'linear'}
                                data={this.state.dataArr}
                                style={{ '.label': { fill: 'black' } }}
                            />
                        </Col>
                        
                        <Col size="lg-12">
                            {/* Summary Stats */}
                            <h2>Summary Stats</h2>
                            <br/>
                            <p>Total Spent: ${this.state.spendingTotal}</p>
                            <br/>
                            <h5>Category Totals</h5>
                                {this.state.categorySpendingTotals.length ? (
                                    <Row>
                                        <Col size="lg-3">
                                            {this.state.categoryArr.map(cat => (
                                                <p>{cat}:</p>
                                            ))}
                                        </Col>
                                        <Col size="lg-3">
                                            {this.state.categorySpendingTotals.map(catTotal => (
                                                <p>${catTotal}</p>
                                            ))}
                                        </Col>
                                    </Row>
                                    ) : (
                                        <h3>No Results to Display</h3>
                                )}
                            {/* <p>{this.state.categoryArr[0]}: ${this.state.categorySpendingTotals[0]}</p>
                            <p>{this.state.categoryArr[1]}: ${this.state.categorySpendingTotals[1]}</p>
                            <p>{this.state.categoryArr[2]}: ${this.state.categorySpendingTotals[2]}</p>
                            <p>{this.state.categoryArr[3]}: ${this.state.categorySpendingTotals[3]}</p>
                            <p>{this.state.categoryArr[4]}: ${this.state.categorySpendingTotals[4]}</p> */}
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    };

};


export default SpendingPage;