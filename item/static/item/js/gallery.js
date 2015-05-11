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


React.render(
  <Gallery imageIds={helper}></Gallery>,
  document.getElementById('content')
);