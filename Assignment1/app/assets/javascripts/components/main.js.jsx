var Main = React.createClass({

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
        url: '/display',
        dataType: 'json',
        type: 'POST',
        data: {
          input_group_by: this.state.input_group_by,
          input_sort_by: this.state.input_sort_by,
          input_display_arr: this.state.input_display_arr
        },
        success: function(result) {
          this.setState({students: result});
          console.log(JSON.stringify(this.state.students));

        }.bind(this),
        error: function(xhr, status, err) {
          // this.setState({students: user});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      <Filter  />
    },

    handleChange: function (name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    },

  render: function() {
    if (this.state.submitted) {
            return <Filter input_group_by={this.state.input_group_by} students={this.state.students}/>;
        }
        else {
      return (
        <div>
          <form role="form" onSubmit={this.handleSubmit}  >
            <label ref="input_group_by">Group by: student_id/department/year </label>
            <input ref="input_group_by" placeholder="" type="text" value={this.state.input_group_by}  onChange={this.handleChange.bind(this, 'input_group_by')}/>
            <label ref="input_sort_by">SORT BY: maths/physics/chemistry </label>
            <input ref="input_sort_by" placeholder="" type="text" value={this.state.input_sort_by}  onChange={this.handleChange.bind(this, 'input_sort_by')}/>
            <label ref="input_display_arr">Display fields: maths,physics,chemistry </label>
            <input ref="input_display_arr" placeholder="" type="text" value={this.state.input_display_arr}  onChange={this.handleChange.bind(this, 'input_display_arr')}/>

            <label ref="year_1">Year 1 </label>
            <input ref="year_1" placeholder="" type="text" value={this.state.year_1}  onChange={this.handleChange.bind(this, 'year_1')}/>
            <label ref="year_2">year_2 </label>
            <input ref="year_2" placeholder="" type="text" value={this.state.year_2}  onChange={this.handleChange.bind(this, 'year_2')}/>
            <label ref="should_total">Should total? true/false </label>
            <input ref="should_total" placeholder="" type="text" value={this.state.should_total}  onChange={this.handleChange.bind(this, 'should_total')}/>
            <br/>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
});
