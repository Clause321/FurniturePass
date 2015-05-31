var React = require('react');
var bs = require('react-bootstrap');
var {Navbar} = bs;

module.exports = React.createClass({
    render: function(){
        return(
            <Navbar className='navi' brand='Stuff Pass' staticTop>

            </Navbar>
        );
    }
});