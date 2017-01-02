
    render: function() {

        var rows = this.rowGenerator();
        return (
            React.createElement("div", null, 
                React.createElement("table", null, 
                    React.createElement("thead", null, 
                        React.createElement("tr", null, 
                            Object.values(this.props.input_display_arr).map(function(header) {
                                return React.createElement("th", null, header)
                            }, this)
                        
                    )
                ), 
                React.createElement("tbody", null, 
                    rows
                )

            )
        )
    );
},

rowGenerator: function() {

    return Object.keys(this.props.students).map(function(value) {

        return ([
            this.props.students[value].map(function(display) {

                return (
                    React.createElement("tr", null, Object.values(this.props.input_display_arr).map(function(subject) {

                            return React.createElement("td", null, display[subject])
                        }, this))
                    )
                }, this),
                this.props.should_total == 'true'
                ? (React.createElement(TotalRow, {students: this.props.students[value], input_display_arr: this.props.input_display_arr}))
                : '',
                this.props.should_compare == 'true' && this.props.input_group_by == 'student_id'
                ? (React.createElement(CompareRow, {students: this.props.students[value], input_display_arr: this.props.input_display_arr, year_1: this.props.year_1, year_2: this.props.year_2}))
                : ''

            ])
        }, this)
    }

});

var CompareRow = React.createClass({displayName: "CompareRow",

    getInitialState: function() {
        return {'compare_maths': 0, 'compare_physics': 0, 'compare_chemistry': 0}
    },
    compare: function() {
        var compare_year_1 = '',
        compare_year_2 = ''
        this.props.students.map(function(student) {
            if (student['year'] == parseInt(this.props.year_1) && (student))
            compare_year_1 = student
            if (student['year'] == parseInt(this.props.year_2) && (student))
            compare_year_2 = student
        }, this)

        return Object.values(this.props.input_display_arr).map(function(subject_name) {
            var compare_marks = 0
            if (compare_year_1)
            compare_marks = Math.abs(compare_marks - compare_year_1[subject_name])
            if (compare_year_2)
            compare_marks = Math.abs(compare_marks - compare_year_2[subject_name])

            if (['maths', 'physics', 'chemistry'].includes(subject_name)) {
                return (
                    React.createElement("td", null, compare_marks)
                )
            }

        }, this)

    },

    render: function() {
        var compareRow = this.compare();
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, "Change"), 
                compareRow
            )
        );
    }
});

var TotalRow = React.createClass({displayName: "TotalRow",
    getInitialState: function() {
        return {'maths_total': 0, 'physics_total': 0, 'chemistry_total': 0}
    },
    add: function(subject_name) {
        if (subject_name == 'maths') {
            return this.addMaths(subject_name);
        } else if (subject_name == 'physics') {
            return this.addPhysics(subject_name);
        } else if (subject_name == 'chemistry') {
            return this.addChemistry(subject_name);
        } else {
            return " "
        }

    },
    addMaths: function(value) {
        this.props.students.map(function(subject) {
            this.state.maths_total = this.state.maths_total + subject[value]
        }, this)
        return (
            React.createElement("td", null, this.state.maths_total)
        );

    },
    addPhysics: function(value) {
        this.props.students.map(function(subject) {
            this.state.physics_total = this.state.physics_total + subject[value]
        }, this)
        return (
            React.createElement("td", null, this.state.physics_total)
        );

    },
    addChemistry: function(value) {
        this.props.students.map(function(subject) {
            this.state.chemistry_total = this.state.chemistry_total + subject[value]
        }, this)
        return (
            React.createElement("td", null, this.state.chemistry_total)
        );

    },
    totalGenerator: function() {
        return Object.values(this.props.input_display_arr).map(function(subject_name) {
            return this.add(subject_name);

        }, this)
    },
    render: function() {
        var total = this.totalGenerator();
        return (
            React.createElement("tr", null, 
                React.createElement("td", null, "Total"), 
                total
            )
        )

    }
});