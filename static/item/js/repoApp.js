var Panel = ReactBootstrap.Panel;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Popover = ReactBootstrap.Popover;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Input = ReactBootstrap.Input;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var Well = ReactBootstrap.Well;
var Table = ReactBootstrap.Table;
var temp = window.location.href.split("/");
var repoId = temp[4]; //this index is hard code right now, because it is kind of difficult to use angular-route
var repoAddress = "/api/repo/" + repoId;
var categoryAPIURL = "/api/category";
var tagAPIURL = "/api/tag";


var FilterList = React.createClass({
    removeHandler: function(name) {
        this.props.removeHandler(name);
    },
    render: function() {
        console.log("render execute");
        var filterItem = function(filterName, index) {
          return <li key={index + filterName}
              onClick={this.removeHandler.bind(this, filterName)}>{filterName}</li>;
        };
        return (
            <ul>{this.props.filters.map(filterItem, this)}</ul>
        );
    }
});

var CategoryTagBox = React.createClass({
    handleAddClick: function(name) {
        this.props.addHandler(name);
    },
    handleRemoveClick: function(name) {
        this.props.removeHandler(name);
    },
    renderCategory() {
        var categoryNodes = (<span></span>);
        if(this.props.categorylist.length != 0) {
            console.log(this.props.categorylist);
            categoryNodes = this.props.categorylist.map(function(categoryObject, i) {
                return(
                    <li key={i} className="categoryLabel"
                        onClick={this.handleAddClick.bind(this, categoryObject.category_name)}>{categoryObject.category_name}</li>
                );
            }, this);
        }
        return categoryNodes;
    },
    renderTag() {
        var TagNodes = (<span></span>);
        if(this.props.taglist.length != 0) {
            var count = 0;
            console.log(this.props.taglist);
            categoryNodes = this.props.taglist.map(function(tagObject) {
                return(
                    <li key={count++}><a href="#">{tagObject.tag_name}</a></li>
                );
            });
        }
        return TagNodes;
    },
    render: function() {
        var categoryNodes = this.renderCategory();
        var tagNodes = this.renderTag();
        return(
            <div>
                <div className="filterDisplayBar">
                    <Row>
                        <Col xs={1}>
                            <p>Filter By:</p>
                        </Col>
                        <Col xs={11}>
                            <FilterList filters={this.props.filters}
                                removeHandler={this.handleRemoveClick}></FilterList>
                        </Col>
                    </Row>
                </div>
                <div className="CateTagUl">
                    <Row>
                        <Col xs={1}>
                            <p>Categories:</p>
                        </Col>
                        <Col xs={11}>
                            <ul>
                                {categoryNodes}
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className="CateTagUl">
                    <Row>
                        <Col xs={1}>
                            <p>Tags:</p>
                        </Col>
                        <Col xs={11}>
                            <ul>
                                {tagNodes}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});

var Slider = React.createClass({
    render: function() {
        return(
                <Row>
                    <Col xs={3}>
                        <p>Min: <span id="slider-lower"></span></p>
                    </Col>
                    <Col xs={3}>
                        <p>Max: <span id="slider-upper"></span></p>
                    </Col>
                    <Col xs={6}>
                        <div id="slider"></div>
                    </Col>
                </Row>
        );
    },
    componentDidMount: function () {
        function init_slider(This) {
            $("#slider").noUiSlider({
                start: [0, 10000],
                behaviour: 'drag-tap',
                connect: true,
                range: {
                    'min': 0,
                    'max': 10000
                }
            }).change(function() {
                var minPrice = $("#slider-lower").text();
                var maxPrice = $("#slider-upper").text();
                console.log("min price becomes to: " + minPrice);
                console.log("max price becomes to: " + maxPrice);
                $.ajax({
                    url: This.props.baseurl,
                    dataType: 'json',
                    success: function (data) {
                        console.log(This.props.baseurl);
                    },
                    error: function (xhr, status, err) {
                        console.error(This.props.baseurl, status, err.toString());
                    }
                });
            });
        }
        function link() {
            $("#slider").Link('lower').to($('#slider-lower')).Link('upper').to($('#slider-upper'));
        }
        init_slider(this);
        link();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
});

/*This is search bar module*/
var SearchBar = React.createClass({
    handleChange: function() {
        console.log("search: " + this.refs.searchBar.getInputDOMNode().value);
        this.props.onUserInput(this.refs.searchBar.getInputDOMNode().value);
    },
    render: function() {
        return (
            <div className="navbar-form navbar-right">
                <div className="form-group">
                <Input
                    type='text'
                    placeholder='Search...'
                    hasFeedback
                    ref="searchBar"
                    groupClassName='group-class'
                    wrapperClassName='wrapper-class'
                    labelClassName='label-class'
                />
                </div>
                <Button bsStyle='info' onClick={this.handleChange} id="searchbutton">go!</Button>
            </div>
        );
    }
});

var NavBarInstance = React.createClass({
    render: function () {
        return (
            <Navbar brand='StuffPass' className="navbar-fixed-top" role="navigation">
                <Nav>
                  <NavItem eventKey={1} href='#'>Link</NavItem>
                  <NavItem eventKey={2} href='#'>Link</NavItem>
                  <DropdownButton eventKey={3} title='Dropdown'>
                    <MenuItem eventKey='1'>Action</MenuItem>
                    <MenuItem eventKey='2'>Another action</MenuItem>
                    <MenuItem eventKey='3'>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey='4'>Separated link</MenuItem>
                  </DropdownButton>
                    <SearchBar filterText={this.props.searchText} onUserInput={this.props.func}>
                    </SearchBar>
                </Nav>
            </Navbar>
        );
    }
});

var ItemBox = React.createClass({
    render: function () {
        return (
            <div className="itemBox">
                <ItemList data={this.props.data} filterText={this.props.filterText} />
            </div>
        );
    }
});

var ItemList = React.createClass({
    render: function () {
        var keyword = this.props.filterText;
        var itemNodes = this.props.data.map(function (item, i) {
            if (item.item_name.indexOf(keyword) != -1) {
               return (
                    <Item item_id={item.item_id} item_name={item.item_name} price={item.sell_price}
                        owner={item.owner.username} time={item.expire_time} imgurl1={item.image1}
                        imgurl2={item.image2} imgurl3={item.image3} key={i}>
                        {item.description}
                    </Item>
                );
            }
        });
        return (
            <div className="customRow">
                {itemNodes}
            </div>
        );
    }
});

var Item = React.createClass({
    render: function () {
        return (
            <div className="item">
                <Panel>
                    <h4>{this.props.item_name}</h4>
                    <h5>
                        ${this.props.price}
                    </h5>
                    <div className="thumbImage">
                        <img src={this.props.imgurl1}></img>
                    </div>
                    <div>
                        <ButtonToolbar>
                            <OverlayTrigger trigger="click" placement="right" overlay={
                                <Popover title={this.props.item_name}>
                                    <div>
                                        <h5>Owner: {this.props.owner}</h5>
                                        <h5>price: ${this.props.price}</h5>
                                        <h5>Expire Time: {this.props.time}</h5>
                                        <p>
                                            {this.props.children.toString()}
                                        </p>
                                    </div>
                                </Popover>}>
                                <Button bsStyle="default">Show Detail</Button>
                            </OverlayTrigger>
                            &nbsp;
                            <a href={"/item/"+this.props.item_id}>
                                <Button bsStyle="info">Check it out</Button>
                            </a>
                        </ButtonToolbar>
                    </div>
                </Panel>
            </div>
        );
    }
});



var Repo = React.createClass({
    handleAddClick: function(name) {
        var nextFilters = this.state.filters;
        if (nextFilters.indexOf(name) == -1) {
            nextFilters.push(name);
            this.setState({
                filters: nextFilters
            });
            console.log(nextFilters);
        }
    },
    handleRemoveClick: function(name) {
        var nextFilters = this.state.filters;
        var index = nextFilters.indexOf(name);
        if(index != -1) {
            nextFilters.splice(index, 1);
            this.setState({
                filters: nextFilters
            });
        }
    },
    loadItemsFromServer: function () {
        $.ajax({
            url: this.props.itemApiUrl,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.goto, status, err.toString());
            }.bind(this)
        });
    },
    loadCategoryAndTagFromServer: function() {
        $.ajax({
            url: this.props.cateApiUrl,
            dataType: 'json',
            success: function (data) {
                this.setState({category: data});
                //console.log(data);
                //[object: {category_name, id}]
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.cateApiUrl, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: this.props.tagApiUrl,
            dataType: 'json',
            success: function (data) {
                this.setState({tag: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.tagApiUrl, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadItemsFromServer();
        this.loadCategoryAndTagFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    getInitialState: function() {
        return {
            filters:[],
            tag: [],
            category: [],
            data: [],//item
            filterText: ''
        }
    },
    handleUserInput: function(filterText) {
        //handle all stuff here
        this.setState({
            filterText: filterText
        });
    },
    render: function() {
        return (
            <div>
                <NavBarInstance searchText={this.state.filterText}
                    func={this.handleUserInput}>
                </NavBarInstance>
                <div className="container" id="content-block" >
                    <Well>
                        <CategoryTagBox taglist={this.state.tag}
                            categorylist={this.state.category}
                            addHandler={this.handleAddClick}
                            removeHandler={this.handleRemoveClick}
                            filters={this.state.filters}></CategoryTagBox>
                        <Slider baseurl={this.props.itemApiUrl}></Slider>
                    </Well>
                    <br/>
                    <ItemBox
                        data={this.state.data}
                        filterText={this.state.filterText}>
                    </ItemBox>
                </div>
            </div>
        );
    }
});

React.render(
    <Repo itemApiUrl={repoAddress} cateApiUrl={categoryAPIURL} tagApiUrl={tagAPIURL}/>,
    document.getElementById('content')
);


$(document).keydown(function(event) {
    if (event.keyCode == 13) {
        $("#searchbutton").click();
    }
});