
  getInitialState: function() {
       return {
         'input_group_by': '',
         'input_sort_by': '',
         'input_display_arr': '',
         'year_1': '',
         'year_2': '',
         'should_compare': '',
         'should_total': '',
         'submitted': false,
        'students':[]
      };
   },

   handleSubmit: function(e) {
        e.preventDefault();
        this.fetchData();
        this.setState({'submitted': true });
    },


    fetchData: function(){
      $.ajax({
        url: '/students',
        dataType: 'json',
        type: 'GET',
        success: function(result) {
          this.setState({students: result});
          console.log(this.state.students);

        }.bind(this),
        error: function(xhr, status, err) {
          // this.setState({students: user});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      React.createElement(Filter, null)
    },

    handleChange: function (name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    },

  render: function() {
    if (this.state.submitted) {
            return React.createElement(Filter, {students: this.state.students});
        }
        else {
      return (
        React.createElement("div", null, 
          React.createElement("form", {role: "form", onSubmit: this.handleSubmit}, 
            React.createElement("label", {ref: "input_group_by"}, "Group by: student_id/department/year "), 
            React.createElement("input", {ref: "input_group_by", placeholder: "", type: "text", value: this.state.input_group_by, onChange: this.handleChange.bind(this, 'input_group_by')}), 
            React.createElement("label", {ref: "input_sort_by"}, "SORT BY: maths/physics/chemistry "), 
            React.createElement("input", {ref: "input_sort_by", placeholder: "", type: "text", value: this.state.input_sort_by, onChange: this.handleChange.bind(this, 'input_sort_by')}), 
            React.createElement("label", {ref: "input_display_arr"}, "Display fields: maths,physics,chemistry "), 
            React.createElement("input", {ref: "input_display_arr", placeholder: "", type: "text", value: this.state.input_display_arr, onChange: this.handleChange.bind(this, 'input_display_arr')}), 

            React.createElement("label", {ref: "year_1"}, "Year 1 "), 
            React.createElement("input", {ref: "year_1", placeholder: "", type: "text", value: this.state.year_1, onChange: this.handleChange.bind(this, 'year_1')}), 
            React.createElement("label", {ref: "year_2"}, "year_2 "), 
            React.createElement("input", {ref: "year_2", placeholder: "", type: "text", value: this.state.year_2, onChange: this.handleChange.bind(this, 'year_2')}), 
            React.createElement("label", {ref: "should_total"}, "Should total? true/false "), 
            React.createElement("input", {ref: "should_total", placeholder: "", type: "text", value: this.state.should_total, onChange: this.handleChange.bind(this, 'should_total')}), 
            React.createElement("br", null), 
            React.createElement("input", {type: "submit", value: "Submit"})
          )
        )
      );
    }
  }
});