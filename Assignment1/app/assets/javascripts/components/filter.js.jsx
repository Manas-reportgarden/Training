var Filter = React.createClass({

  render: function() {
    return (<div>
      {
        Object.values(this.props.students).map(function(key){
          debugger
          return   key.map(function(k){
            debugger
            return (k.department);
          })
        }, this)
      }
    </div>);
  }
});
