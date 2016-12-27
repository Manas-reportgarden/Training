var Filter = React.createClass({

  render: function() {
    return (<div><table>
       <thead>
        {Object.values(this.props.input_display_arr).map(function(header){
          return <th>{header}</th>
        },this)
      }
    </thead>
    <tbody>
      {
        Object.keys(this.props.students).map(function(value){
          debugger
          return this.props.students[value].map(function(display){
            debugger
            return (<tr>{Object.values(this.props.input_display_arr).map(function(subject){
              debugger
              return <td>{display[subject]}</td>
            },this)}</tr>)
          }, this)
        }, this)
      }
    </tbody>

    </table>
    </div>);
}
});
