var AccountPage = React.createClass({
    render: function(){
        return(
            <div>
                <LoginForm />
                <HelloInfo />
            </div>
        )
    }
});

var HelloInfo = React.createClass({
    getInitialState: function() {

        return {account: {}};
    },

    componentDidMount: function(){
        $.ajax({
            url: '/api/account/{{user.id}}',
            dataType: 'json',
            type: 'GET',
            success: function(data){
                this.setState({account: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function(){
        return(
            <span className="helloInfo"> Hello, {account.username}</span>
        )
    }
});

React.render(
    <AccountPage />,
    document.getElementById('content')
);