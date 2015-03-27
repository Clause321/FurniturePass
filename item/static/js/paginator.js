var Panel = ReactBootstrap.Panel;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Popover = ReactBootstrap.Popover;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;

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
                <ItemList data={this.state.data} />
            </div>
        );
    }
});

var ItemList = React.createClass({
    render: function () {
        var itemNodes = this.props.data.map(function (item) {
            return (
                <Item item_name={item.item_name} price={item.sell_price} owner={item.owner_name} time={item.expire_time}>
                    {item.description}
                </Item>
            );
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


var temp = window.location.href.split("/");
var repoId = temp[4]; //this index is hard code right now, because it is kind of difficult to use angular-route
var getLink = "/api/items/" + repoId;

//buttons try



var buttonsInstance = (
    <ButtonToolbar>
      {/* Standard button */}
      <Button>Default</Button>

      {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
      <Button bsStyle="primary">Primary</Button>

      {/* Indicates a successful or positive action */}
      <Button bsStyle="success">Success</Button>

      {/* Contextual button for informational alert messages */}
      <Button bsStyle="info">Info</Button>

      {/* Indicates caution should be taken with this action */}
      <Button bsStyle="warning">Warning</Button>

      {/* Indicates a dangerous or potentially negative action */}
      <Button bsStyle="danger">Danger</Button>

      {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
      <Button bsStyle="link">Link</Button>
    </ButtonToolbar>
);
var mountNode = document.getElementById('buttons');
React.render(buttonsInstance, mountNode);

React.render(
    <ItemBox url={getLink} />,
    document.getElementById('content')
);