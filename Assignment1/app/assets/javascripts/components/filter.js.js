
  render: function() {

    var rows = this.rowGenerator(),
    total = this.totalGenerator();
    return (React.createElement("div", null, React.createElement("table", null, 
      React.createElement("thead", null, 
        Object.values(this.props.input_display_arr).map(function(header){
          return React.createElement("th", null, header)
        },this)
      
    ), 
    React.createElement("tbody", null, 
      rows
    )

  )
));
},
rowGenerator: function(){
  return Object.keys(this.props.students).map(function(value){

    return ([React.createElement("tr", null, this.props.students[value].map(function(display){

      return (React.createElement("tr", null, Object.values(this.props.input_display_arr).map(function(subject){
        debugger
        return React.createElement("td", null, display[subject])
      },this)))
    }, this)),
    React.createElement("tr", null, 
      React.createElement("td", null, "Total"), 
      React.createElement(TotalRow, {students: this.props.students[value], 
        input_display_arr: this.props.input_display_arr})
    )
  ])
}, this)
},
totalGenerator: function(){

}

});

var TotalRow = React.createClass({displayName: "TotalRow",
  getInitialState: function(){
    return { 'maths_total': 0}
  },
  addMaths: function(value){
    this.props.students.map(function(subject){
      this.state.maths_total = this.state.maths_total + subject[value]
    }, this)
    {debugger}
    return this.state.maths_total;

  },

  render: function(){
    return (React.createElement("td", null, 
      Object.values(this.props.input_display_arr).map(function(subject_name){
        return (subject_name == 'maths')? (
          this.addMaths(subject_name)
        ): ('');
      }, this)
        ));

  }
});