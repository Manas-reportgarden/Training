
  render: function() {
    return (React.createElement("div", null, 
      
        Object.values(this.props.students).map(function(key){
          debugger
          return   key.map(function(k){
            debugger
            return (k.department);
          })
        }, this)
      
    ));
  }
});