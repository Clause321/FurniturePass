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
var Grid = ReactBootstrap.Grid;
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;
var temp = window.location.href.split("/");
var repoId = temp[4]; //this index is hard code right now, because it is kind of difficult to use angular-route
var repoAddress = "/api/repo/" + repoId;



var Slider = React.createClass({
    componentDidMount: function () {
        console.log("componentDidMount() execute");
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
    },
    render: function() {
        console.log("render execute");
        return(
            <Grid>
                <Row>
                    <Col xs={6}>
                        <p>Min: <span id="slider-lower"></span></p>
                    </Col>
                    <Col xs={6}>
                        <p>Max: <span id="slider-upper"></span></p>
                    </Col>
                    <br/>
                    <Col xs={12}>
                        <div id="slider"></div>
                    </Col>
                </Row>
            </Grid>
        );
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
            <form className="navbar-form navbar-right">
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
                <Button bsStyle='info' onClick={this.handleChange}>go!</Button>
            </form>
        );
    }
});

var NavBarInstance = React.createClass({
    render: function () {
        return (
            <Navbar brand='StuffPass' className="navbar navbar-default navbar-static-top" role="navigation">
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
        var count = 0;
        var itemNodes = this.props.data.map(function (item) {
            if (item.item_name.indexOf(keyword) != -1) {
               return (
                    <Item item_id={item.item_id} item_name={item.item_name} price={item.sell_price}
                        owner={item.owner.username} time={item.expire_time} key={count++}>
                        {item.description}
                    </Item>
                );
            }
        });
        return (
            <Grid>
                <Row>
                {itemNodes}
                </Row>
            </Grid>
        );
    }
});

var Item = React.createClass({
    render: function () {
        return (
            <Col xs={4}>
                <div className="item">
                    <Panel>
                        <h4>{this.props.item_name}</h4>
                        <h5>
                            ${this.props.price}
                        </h5>
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
            </Col>
        );
    }
});

var Repo = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.goto,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.goto, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    getInitialState: function() {
        return {
            data: [],
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
                <NavBarInstance searchText={this.state.filterText} func={this.handleUserInput}></NavBarInstance>
                <div className="container" >
                    <Slider baseurl={this.props.goto}></Slider>
                    <br/>
                    <ItemBox data={this.state.data} filterText={this.state.filterText}></ItemBox>
                </div>
            </div>
        );
    }
});



React.render(
    <Repo goto={repoAddress}/>,
    document.getElementById('content')
);



