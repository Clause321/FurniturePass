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
var Repo = require('./item/repoApp');
var Item = require('./item/item');
var SearchIndex = require('./index/ren_index');

var routes = (
    <Route name='app' handler={App} path='/'>
        <DefaultRoute handler={Index} />{/* the path of this is '/#/' */}
        <Route name='auth' handler={Auth} />{/* the path of this is '/#?auth' */}
        <Route path="repo/:RepoID" handler={Repo} />{/* the path of this is '/#/repo' */}
        <Route path="item/:ItemID" handler={Item} />
        <Route path='start' name='search_index' handler={SearchIndex}></Route>
    </Route>
);

Router.run(routes, function(Handler){
    React.render(<Handler />, document.getElementById('content'));
});