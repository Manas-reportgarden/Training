var Filter = React.createClass({

  render: function() {

    var rows = this.rowGenerator(),
    total = this.totalGenerator();
    return (<div><table>
      <thead>
        {Object.values(this.props.input_display_arr).map(function(header){
          return <th>{header}</th>
        },this)
      }
    </thead>
    <tbody>
      {rows}
    </tbody>

  </table>
</div>);
},
rowGenerator: function(){
  return Object.keys(this.props.students).map(function(value){

    return ([<tr>{this.props.students[value].map(function(display){

      return (<tr>{Object.values(this.props.input_display_arr).map(function(subject){
        debugger
        return <td>{display[subject]}</td>
      },this)}</tr>)
    }, this)}</tr>,
    <tr>
      <td>Total</td>
      <TotalRow  students={this.props.students[value]}
        input_display_arr={this.props.input_display_arr} />
    </tr>
  ])
}, this)
},
totalGenerator: function(){

}

});

var TotalRow = React.createClass({
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
    return (<td>{
      Object.values(this.props.input_display_arr).map(function(subject_name){
        return (subject_name == 'maths')? (
          this.addMaths(subject_name)
        ): ('');
      }, this)
        }</td>);

  }
});
