/**
 * Created by renl on 5/28/15.
 */
var React = require('react/addons');
var $ = require('jquery');

var { Button, Row, Grid, Col, Well } = require('react-bootstrap');

function renderTreeToList(node){
    if(node.children.length != 0) {
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
    render: function() {
        return (
            <div className="tree" id={"tree-node-"+this.props.root_node.self.id}>
                <Row>
                    <Col xs={8}>
                        <div>
                            <ul>
                                {renderTreeToList(this.props.root_node)}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <Button onClick={this.props.navFunction}>Back</Button>
                    </Col>
                </Row>

            </div>
        );
    }
});


var CategoryTreeBox = React.createClass({
    render: function() {
        return (
            <div className="CategoryTreeBox">
                <CategoryTree root_node={this.props.root_node} navFunction={this.props.navFunction}></CategoryTree>
            </div>
        );
    }
});
var EveryThingBox = React.createClass({
    showTree: function(treeNodeId) {
        $('.banner').fadeOut('fast', function() {
            var selector = '#tree-node-' + treeNodeId;
            $(selector).fadeIn();
        });
    },
    returnBack: function(treeNodeId) {
        var selector = '#tree-node-' + treeNodeId;
        $(selector).fadeOut('fast', function() {
            $('.banner').fadeIn('fast');
        });
    },
    render: function() {
        var divStyle = {
            backgroundImage: 'url(' + this.props.url + ')',
            backgroundRepeat: 'no-repeat'
        };
        var treeNodeId = this.props.correspond_node.self.id;
        return (
            <div>
                <div style={divStyle} className="banner" onClick={this.showTree.bind(this, treeNodeId)}>
                    <p>{this.props.banner_name}</p>
                </div>
                <CategoryTreeBox
                    root_node={this.props.correspond_node}
                    navFunction={this.returnBack.bind(this, treeNodeId)}>
                </CategoryTreeBox>
            </div>
        );
    }
});

var EntryPage = React.createClass({
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
    getInitialState: function() {
        return({
            "root_nodes": [],
            "structure": {},
            "filters": []
        })
    },
    render: function() {
        var BannerImages = (this.state.root_nodes.length==0 ? "" : this.state.root_nodes.map(function(root_node, i) {
            return(
                <EveryThingBox url={root_node.self.banner}
                    banner_name={root_node.self.category_name} correspond_node={root_node}
                    key={i}>
                </EveryThingBox>
            );
        }));
        return(
            <div className="container">
                <Well>
                    <p>This space is left for filters</p>
                </Well>
                {BannerImages}
            </div>
        );
    }
});


module.exports = EntryPage;