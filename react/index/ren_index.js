/**
 * Created by renl on 5/28/15.
 */
var React = require('react/addons');
var $ = require('jquery');

var { Button, Row, Grid, Col } = require('react-bootstrap');

function renderTreeToList(node){
    console.log(node.children);
    if(node.children.length != 0) {
        console.log(node.children.length);
        return (
            <li key={node.self.id}>
                <a>{node.self.category_name}</a>
                <ul>
                    {node.children.map(function(child_node) {
                        return renderTreeToList(child_node);
                    })}
                </ul>
            </li>
        );
    }
    else {
        return (
            <li key={node.self.id}>
                <a>{node.self.category_name}</a>
            </li>
        );
    }

}



var CategoryTree = React.createClass({
    getInitialState: function() {
        return ({
            "root_nodes": [],
            "structure": {}
        })
    },
    loadTreeFromServer: function() {
        $.ajax({
            url: '/api/category',
            dataType: 'json',
            success: function (data) {
                var temp; //cash the data
                var root_nodes = [];
                var id_obj_map = {};
                for (var i = 0; i < data.length; i++) {
                    temp = data[i];
                    id_obj_map[temp.id] = {'self': temp, 'children': []};
                }
                data.sort(function(a, b) {return b.level - a.level});
                for (var i = 0; i < data.length; i++) {
                    temp = data[i];
                    if(temp.level == 0) {
                        root_nodes.push(id_obj_map[temp.id]);
                    }
                    else {
                        id_obj_map[temp.parent].children.push(id_obj_map[temp.id]);
                    }
                }
                this.setState({
                    "root_nodes": root_nodes,
                    "structure": id_obj_map
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('/api/category', status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadTreeFromServer();
    },
    render: function() {
        var treeUniqueListResult = this.state.root_nodes.map(function(root_node) {
            return (
                <Col xs={6}>
                    <div>
                        <ul>
                            {renderTreeToList(root_node)}
                        </ul>
                    </div>
                </Col>
            );
        });
        return (
            <div className="container">
                <div className="tree">
                    <Row>
                        {treeUniqueListResult}
                    </Row>
                </div>
            </div>

        );
    }
});
module.exports = CategoryTree;