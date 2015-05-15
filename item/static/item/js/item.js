var BASE_DIR = '/static/item/img/';
var helper = [{"id":"1"},{"id":"2"},{"id":"3"}];


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
    handleClick: function(imageid) {
        var imgsrc = BASE_DIR + imageid + '.png';
        this.setState({displayImgSrc: imgsrc});
    },
    getInitialState: function() {
        return {
            displayImgSrc: (BASE_DIR+3+'.png'),
            images: this.props.imageIds
        }
    },
    render: function() {
        return (
            <div className="gallery">
                <SelectedImg source={this.state.displayImgSrc}/>
                <ImageRow>
                    {this.state.images.map(function(image) {
                      return (
                        <a href={"#"+image.id} onClick={this.handleClick.bind(this,image.id)}>
                          <ThumbNailImg thumbsource={BASE_DIR+'s_'+image.id+'.png'} />
                        </a>
                      )
                    }, this)}
                </ImageRow>
            </div>
        );
   }
});


var ItemPage = React.createClass({
    getInitialState: function() {
        return({data: null});
    },
    loadItemInformation: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (item) {
                this.setState({data: item[0]});
                console.log(this.state.data.item_name)
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadItemInformation();
    },
    render: function() {
       return (
           <div>
               <div className="container">
                   <div className="col-xs-6">
                       <Gallery imageIds={helper}></Gallery>
                   </div>
                   <div className="col-xs-6">
                       <InformationBlock data={this.state.data}></InformationBlock>
                   </div>
               </div>
           </div>
       );
    }
});

var InformationBlock = React.createClass({
    render: function (){
        var item_name;
        var item_price;
        var item_owner;
        if(this.props.data != null) {
            item_name = this.props.data.item_name;
            item_price = this.props.data.sell_price;
            item_owner = this.props.data.owner;
        }
        return(
            <div>
                <h1 className="">{item_name}</h1>
                <div className="clearfix">
                    <div className="pull-left">
                        <p>owned by: {item_owner}</p>
                    </div>
                    <div>
                        <h3 className="pull-right">${item_price}</h3>
                    </div>
                </div>

            </div>
        );
    }
});

var temp = window.location.href.split("/");
var itemId = temp[4];
var itemAddress = "/api/item/" + itemId;

React.render(
  <ItemPage url={itemAddress}></ItemPage>,
  document.getElementById('content')
);