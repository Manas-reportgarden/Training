var Filter = React.createClass({

  render: function() {

    var rows = this.rowGenerator();
    return (<div><table>
      <thead><tr>
        {Object.values(this.props.input_display_arr).map(function(header){
          return <th>{header}</th>
        },this)
      }
    </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>

  </table>
</div>);
},

rowGenerator: function(){

  return Object.keys(this.props.students).map(function(value){

    return ([this.props.students[value].map(function(display){

      return (<tr>{Object.values(this.props.input_display_arr).map(function(subject){
        debugger
        return <td>{display[subject]}</td>
      },this)}</tr>)
    }, this),
      this.props.should_total == 'true' ?
      (<TotalRow  students={this.props.students[value]}
        input_display_arr={this.props.input_display_arr} />) : ''
    ,
      this.props.should_compare == 'true' &&  this.props.input_group_by == 'student_id' ?
      (<CompareRow  students={this.props.students[value]}
        input_display_arr={this.props.input_display_arr}
        year_1={this.props.year_1}
        year_2={this.props.year_2} />) : ''

  ])
}, this)
}

});

var CompareRow = React.createClass({

  getInitialState: function(){
    return { 'compare_maths': 0,
      'compare_physics': 0,
      'compare_chemistry': 0
    }
  },
  compare: function(){
    var compare_year_1 = '', compare_year_2 = ''
    this.props.students.map(function(student){
      if (student['year']  == parseInt(this.props.year_1) && (student))
      compare_year_1 = student
      if (student['year']  == parseInt(this.props.year_2) && (student))
      compare_year_2 = student
    }, this)


    return Object.values(this.props.input_display_arr).map(function(subject_name){
      var compare_marks = 0
      if(compare_year_1)
      compare_marks = Math.abs(compare_marks - compare_year_1[subject_name])
      if(compare_year_2)
      compare_marks = Math.abs(compare_marks - compare_year_2[subject_name])

      if(['maths', 'physics', 'chemistry'].includes(subject_name)){
        return (<td>{compare_marks}</td>)
      }

    }, this)

  },

  render: function(){
    var compareRow = this.compare();
    return (<tr>
      <td>Change</td>
      {compareRow}
    </tr>);
  }
});

var TotalRow = React.createClass({
  getInitialState: function(){
    return { 'maths_total': 0,
      'physics_total': 0,
      'chemistry_total': 0}
    },
    add: function(subject_name){
      if (subject_name == 'maths'){
        return this.addMaths(subject_name);
      }
      else if (subject_name == 'physics'){
        return this.addPhysics(subject_name);
      }
      else if (subject_name == 'chemistry'){
        return this.addChemistry(subject_name);
      }
      else {
        return " "
      }

    },
    addMaths: function(value){
      this.props.students.map(function(subject){
        this.state.maths_total = this.state.maths_total + subject[value]
      }, this)
      {debugger}
      return (<td>{this.state.maths_total}</td>);

    },
    addPhysics: function(value){
      this.props.students.map(function(subject){
        this.state.physics_total = this.state.physics_total + subject[value]
      }, this)
      {debugger}
      return (<td>{this.state.physics_total}</td>);

    },
    addChemistry: function(value){
      this.props.students.map(function(subject){
        this.state.chemistry_total = this.state.chemistry_total + subject[value]
      }, this)
      {debugger}
      return (<td>{this.state.chemistry_total}</td>);

    },
    totalGenerator: function() {
      return Object.values(this.props.input_display_arr).map(function(subject_name){
          return this.add(subject_name);

        }, this)
    },
    render: function(){
      var total = this.totalGenerator();
      return (<tr>
        <td>Total</td>
        {total}
      </tr>)

    }
  });
