
  render: function() {
    return (React.createElement("div", null, 
      
                Object.keys(this.props.students).map(function(key){
                  return React.createElement("div", {key:  key }, this.props.students[key].physics)
                }, this)
              
    ));
  }
});