var React = require('react');
var Router = require('react-router');

var {Route, DefaultRoute, RouteHandler, State, Navigation} = Router;


var Navi = require('./navi');
var Footer = require('./footer');

var App = React.createClass({
    render: function(){
        return(
            <div>
                <Navi />
                <RouteHandler />
                <Footer />
            </div>
        )
    }
});

var Auth = require('./auth/auth');
var Index = require('./index/index');

var routes = (
    <Route name='app' handler={App} path='/'>
        <DefaultRoute handler={Index} />{/* the path of this is '/#/' */}
        <Route name='auth' handler={Auth} />{/* the path of this is '/#?auth' */}
    </Route>
);

Router.run(routes, function(Handler){
    React.render(<Handler />, document.getElementById('content'));
});