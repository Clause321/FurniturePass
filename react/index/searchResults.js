/**
 * Created by renl on 6/3/15.
 */

var React = require('react/addons');
var $ = require('jquery');

var { Button, Row, Grid, Col, Well, Input } = require('react-bootstrap');


var Pagination = React.createClass({
    actionHandler: function(signal) {
        this.props.actionHandler(signal);
    },
    render: function() {
        var range = 5;
        var half = Math.floor(range/2);
        var totalPage = this.props.totalPage;
        var currentPage = this.props.currentPage;
        var bodyPageList = [];
        var start = (currentPage - half > 0 ? currentPage - half : 1);
        start = (totalPage - currentPage < half ? totalPage-range+1 : start);
        for (var i = start; i < range + start; i++) {
            bodyPageList.push(i);
            if (i == totalPage) break;
        }
        var This = this;
        var bodyRender = bodyPageList.map(function(number, i) {
            if(number == currentPage)
                return (
                    <li className="active" key={i}><a onClick={This.actionHandler.bind(This, number)}>{number}</a></li>
                );
            else return (<li key={i}><a onClick={This.actionHandler.bind(This, number)}>{number}</a></li>);
        });
        var previousButton = (currentPage != 1 ?
            (<li><a onClick={this.actionHandler.bind(this, "+")} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a></li>) :
            (<li className="disabled"><a aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a></li>)
        );
        var nextButton = (currentPage != totalPage ?
            (<li><a onClick={this.actionHandler.bind(this, "-")} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a></li>) :
            (<li className="disabled"><a aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a></li>)
        );
        return (
            <nav>
                <ul className="pagination">
                    {previousButton}
                    {bodyRender}
                    {nextButton}
                </ul>
            </nav>
        );
    }
});

var ResultPage = React.createClass({
    getInitialState() {
        return ({
            currentPageData: null,
            currentPage: -1,
            resultPerPage: 2,
            totalPage: -1
        });
    },
    loadPageFromServer(pageNumber) {
        $.ajax({
            url: '/api/results?page=' + pageNumber,
            dataType: 'json',
            success: function (data) {
                this.setState({
                    currentPageData: data,
                    currentPage: pageNumber
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(xhr);
            }.bind(this)
        });
    },
    PageInitial() {
        $.ajax({
            url: '/api/results',
            dataType: 'json',
            success: function (data) {
                var resultPerPage = this.state.resultPerPage;
                console.log(Math.ceil(data.count/resultPerPage));
                this.setState({
                    currentPageData: data,
                    currentPage: 1,
                    totalPage: Math.ceil(data.count/resultPerPage)
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(xhr);
            }.bind(this)
        });
    },
    componentDidMount() {
        this.PageInitial();
    },
    handleUserAction: function(signal) {
        if(typeof(signal) === 'number') {
            this.loadPageFromServer(signal);
        }
        else if(typeof(signal) === 'string') {
            var currentPage = this.state.currentPage;
            if(signal == "+") this.loadPageFromServer(currentPage-1);
            else if(signal == "-") this.loadPageFromServer(currentPage+1);
        }
    },
    render: function() {
        console.log(this.props.params);
        return (
            <div className="container">
                <ResultList data={this.state.currentPageData}></ResultList>
                <Pagination
                    currentPage={this.state.currentPage}
                    totalPage={this.state.totalPage}
                    actionHandler={this.handleUserAction}
                >
                </Pagination>
            </div>
        );
    }
});

var ResultList = React.createClass({
    render: function() {
        var data = this.props.data;
        var results = (<span></span>);
        if(data != null) {
            results = (data.results.map(function (item){
                return(
                    <div>
                        <h2>{item.item_name}</h2>
                        <p>{item.sell_price}</p>
                    </div>
                );
            }));
        }
        return (
            <div>
                {results}
            </div>
        );
    }
});

module.exports = ResultPage;