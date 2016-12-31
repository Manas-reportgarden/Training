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
        this.setState({students: result[0],
          input_display_arr: result[1]});
          console.log(JSON.stringify(this.state.students));
          console.log(JSON.stringify(this.state.input_display_arr));
        }.bind(this),
        error: function(xhr, status, err) {
          // this.setState({students: user});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    handleChange: function (name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    },

    render: function() {
      if (this.state.submitted) {
        return <Filter input_display_arr={this.state.input_display_arr}
          input_group_by={this.state.input_group_by}
          students={this.state.students}
          year_1={this.state.year_1}
          year_2={this.state.year_2}
          should_total={this.state.should_total}
          should_compare={this.state.should_compare}/>;
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
              <label ref="should_compare">Should compare? true/false </label>
              <input ref="should_compare" placeholder="" type="text" value={this.state.should_compare}  onChange={this.handleChange.bind(this, 'should_compare')}/>
              <br/>
              <input type="submit" value="Submit" />
            </form>
          </div>
        );
      }
    }
  });
