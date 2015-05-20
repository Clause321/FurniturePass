/**
 * Created by renl on 5/11/15.
 */
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

var NavBarInstance = React.createClass({
    render: function () {
        return (
            <Navbar brand='React-Bootstrap' className="navbar-static-top" role="navigation">
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
                </Nav>
            </Navbar>
        );
    }
});

React.render(
  <NavBarInstance></NavBarInstance>,
  document.getElementById('navbar')
);