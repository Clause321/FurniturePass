var React = require('react/addons');
var $ = require('jquery');

var { Label } = require('react-bootstrap');
const itemAddress_BASE_URL = "/api/item/";

var SelectedImg = React.createClass({
    render: function() {
       return (
           <div className="big-img">
               <img src={this.props.source}/>
           </div>);
   }
});

var ThumbNailImg = React.createClass({
    render: function() {
        return (
            <img src={this.props.thumbsource}/>
        );
    }
});

var ImageRow = React.createClass({
    render: function() {
        return (
            <div className="img-row">
                {this.props.children}
            </div>
        )
    }
});

var Gallery = React.createClass({
    handleClick: function(index) {
        this.setState({displayImgIndex: index});
    },
    getInitialState: function() {
        console.log("Gallery initial");
        return {
            displayImgIndex: 0
        }
    },
    render: function() {
        console.log("Gallery render");
        console.log(this.props.imgUrls[0]);
        return (
            <div className="gallery">
                <SelectedImg source={this.props.imgUrls[this.state.displayImgIndex]}/>
                <ImageRow>
                    {this.props.imgUrls.map(function(thumbNailUrl, i) {
                      return (
                        <span onClick={this.handleClick.bind(this,i)} key={i}>
                          <ThumbNailImg thumbsource={thumbNailUrl} />
                        </span>
                      )
                    }, this)}
                </ImageRow>
            </div>
        );
   }
});

var InformationBlock = React.createClass({
    render: function (){
        var item_name, item_price, item_owner, expireTime, description;
        if(this.props.data != null) {
            item_name = this.props.data.item_name;
            item_price = this.props.data.sell_price;
            item_owner = this.props.data.owner.username;
            expireTime = this.props.data.expire_time;
            description = this.props.data.description;
        }
        return(
            <div id="infoBlock">
                <div className="meta-block">
                    <div className="clearfix">
                        <h2 className="pull-left">{item_name}</h2>
                        <Label className="pull-right">Sell by time: {expireTime}</Label>
                    </div>
                    <div className="clearfix">
                        <div className="pull-left">
                            <p>owned by: {item_owner}</p>
                        </div>
                        <div>
                            <p className="pull-right">${item_price}</p>
                        </div>
                    </div>
                </div>
                <div>
                        <p>Item discription: {description}</p>
                </div>
            </div>
        );
    }
});

var ItemPage = React.createClass({
    getInitialState: function() {
        return({
            data: null,
            imgUrls: []
        });
    },
    loadItemInformation: function() {
        $.ajax({
            url: itemAddress_BASE_URL+this.props.params.ItemID,
            dataType: 'json',
            success: function (itemList) {
                var item = itemList[0];
                var validImgUrls = [];
                if(item.image1 != null) {
                    validImgUrls.push(item.image1);
                }
                if(item.image2 != null) {
                    validImgUrls.push(item.image2);
                }
                if(item.image3 != null) {
                    validImgUrls.push(item.image3);
                }
                this.setState({data: item, imgUrls : validImgUrls});
                console.log(validImgUrls);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(itemAddress_BASE_URL+this.props.params.ItemID, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        console.log("item page component Did mount");
        this.loadItemInformation();
    },
    render: function() {
        console.log("Item Page render");
       return (
           <div className="container" id="content-block">
               <div className="col-xs-6">
                   <Gallery imgUrls={this.state.imgUrls}></Gallery>
               </div>
               <div className="col-xs-6">
                   <InformationBlock data={this.state.data}></InformationBlock>
               </div>
           </div>
       );
    }
});

module.exports = ItemPage;