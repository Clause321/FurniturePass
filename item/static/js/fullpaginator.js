/**
 * Created by renl on 3/17/15.
 */
/** @jsx React.DOM */
'use strict';

var React         = require('react');
var ReactPaginate = require('./../react_components');
var $             = require('jquery');

window.React = React;

var ItemList = React.createClass({
    render: function () {
        var itemNodes = this.props.data.map(function (item) {
            return (
                <Item item_name={item.item_name} price={item.sell_price} owner={item.owner_name}>
                    {item.description}
                </Item>
            );
        });
        return (
            <div className="itemList">
                {itemNodes}
            </div>
        );
    }
});

var Item = React.createClass({
    render: function () {
        return (
            <div className="item">
                <h2 className="itemOwner">
                    {this.props.item_name}
                </h2>
                <h3>
                    owner: {this.props.owner}
                </h3>
                <h3>price: ${this.props.price}</h3>
                <p>
                    {this.props.children.toString()}
                </p>
            </div>
        );
    }
});


var App = React.createClass({

  loadCommentsFromServer: function() {
    $.ajax({
      url      : this.props.url,
      data     : {limit: this.props.perPage, offset: this.state.offset},
      dataType : 'json',
      type     : 'GET',

      success: function(data) {
        this.setState({data: data.comments, pageNum: Math.ceil(data.meta.total_count / data.meta.limit)});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handlePageClick: function(data) {
    var selected = data.selected;
    var offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, function() {
      this.loadCommentsFromServer();
    }.bind(this));

    this.loadCommentsFromServer();
  },

  getInitialState: function() {
    return {data: [], offset: 0};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
  },

  render: function () {
    return (
      <div className="itemBox">
        <ItemList data={this.state.data} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClass={"active"} />
      </div>
    );
  }
});

React.render(
  <App url={'/api/items/1'}
       author={'renl'}
       perPage={10} />,
  document.getElementById('react-paginate')
);