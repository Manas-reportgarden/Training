var Filter = React.createClass({

  render: function() {
    return (<div>
      {
                Object.keys(this.props.students).map(function(key){
                  return <div key={ key }>{this.props.students[key].physics}</div>
                }, this)
              }
    </div>);
  }
});
