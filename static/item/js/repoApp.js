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
var CollapsibleNav = ReactBootstrap.CollapsibleNav;

/*This is search bar module*/
var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.searchBar.getInputDOMNode().value);
    },
    render: function() {
        return (
            <form className="navbar-form navbar-left" role="search">
               <Input
                    type='text'
                    value={this.props.filterText}
                    onChange={this.handleChange}
                    placeholder='Search...'
                    hasFeedback
                    ref="searchBar"
                    groupClassName='group-class'
                    wrapperClassName='wrapper-class'
                    labelClassName='label-class'/>
            </form>
        );
    }
});
var NavBarInstance = React.createClass({
    render: function () {
        return (
            <Navbar brand='React-Bootstrap' className="navbar navbar-default navbar-static-top" role="navigation">
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
                    <SearchBar filterText={this.props.searchText} onUserInput={this.props.func}></SearchBar>
                </Nav>
            </Navbar>
        );
    }
});

var ItemBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="itemBox">
                <ItemList data={this.state.data} filterText={this.props.filterText} />
            </div>
        );
    }
});

var ItemList = React.createClass({
    render: function () {
        var keyword = this.props.filterText;
        var itemNodes = this.props.data.map(function (item) {
            if (item.item_name.indexOf(keyword) != -1) {
               return (
                    <Item item_name={item.item_name} price={item.sell_price} owner={item.owner_name} time={item.expire_time}>
                        {item.description}
                    </Item>
                );
            }
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
                <Panel header={this.props.item_name}>
                    <h5>
                        owner: {this.props.owner}
                    </h5>
                    <p>
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
                        </ButtonToolbar>
                    </p>
                </Panel>
            </div>
        );
    }
});

var Repo = React.createClass({
    getInitialState: function() {
        return {
            filterText: ''
        }
    },
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },
    render: function() {
        return (
            <div>
                <NavBarInstance searchText={this.state.filterText} func={this.handleUserInput}></NavBarInstance>
                <div className="container" >
                    <ItemBox url={this.props.goto} filterText={this.state.filterText}></ItemBox>
                </div>
            </div>
        );
    }
});

var temp = window.location.href.split("/");
var repoId = temp[4]; //this index is hard code right now, because it is kind of difficult to use angular-route
var repoAddress = "/api/items/" + repoId;

React.render(
    <Repo goto={repoAddress}/>,
    document.getElementById('content')
);
