
  render: function() {
    return (React.createElement("div", null, React.createElement("table", null, 
       React.createElement("thead", null, 
        Object.values(this.props.input_display_arr).map(function(header){
          return React.createElement("th", null, header)
        },this)
      
    ), 
    React.createElement("tbody", null, 
      
        Object.keys(this.props.students).map(function(value){
          debugger
          return this.props.students[value].map(function(display){
            debugger
            return (React.createElement("tr", null, Object.values(this.props.input_display_arr).map(function(subject){
              debugger
              return React.createElement("td", null, display[subject])
            },this)))
          }, this)
        }, this)
      
    )

    )
    ));
}
});