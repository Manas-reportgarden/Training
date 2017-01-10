var TL = TL || {};
TL.LocationForm = React.createClass({
	propTypes: {
		us_state_list: React.PropTypes.array
	},

	getDefaultProps: function () {
		return {us_state_list: []};
	},

	getInitialState: function () {
		return {
			"name": "",
			"category": 0,
			"url": "",
			"addr_line_1": "",
			"country_name": "United States",
			"state_name": "",
			"zipcode": "",
			"phone_number": "",
			"arr_state_names": [],
			"obj_states": {},
			"criteriaId": "",
			"cities_data": [],
			"countries": ["United States"],
			"city_name": "",
			"addr_line_2": ""
		};
	},

	// Setter for input fields
	handleChange: function (name, e) {
		var change = {};
		change[name] = e.target.value;
		this.setState(change);
	},

	// Gets Criteria Id
	findCriteriaID: function (value) {
		var state = _.findWhere(this.props.us_state_list, {code: value});
		return state.criteria_id;
	},

	// Gets list of all cities
	getCities: function (criteria_id) {
		this.setState({"cities_data": ["Please wait...."]});
		$.ajax({
			url: "/locations/get_cities",
			dataType: "json",
			type: "GET",
			data: {
				"criteria_id": criteria_id
			},
			success: function (result) {
				this.setState({"cities_data": []});
				var cities_arr = [];
				$.each(result, function (i, value) {
					cities_arr.push(value.display_name);
				});
				this.setState({"cities_data": cities_arr});
				this.setState({"city_name": cities_arr[0]});
			}.bind(this),
			error: function () {
				alert("Failed to fetch data");
			}.bind(this)
		});
	},

	//Assigns state name and fetches the cities related to state through an ajax call
	handleStateChange: function (ref, value, state) {
		this.setState({"state_name": state.id});
		var criteria_id = this.findCriteriaID(state.id);
		this.setState({"stateId": criteria_id});
		this.getCities(criteria_id);
	},

	//Setter for callbacks
	handleCallbackChange: function (ref, value) {
		var set_obj = {};
		set_obj[ref] = value;
		this.setState(set_obj);
	},

	componentDidMount: function () {
		var state_names_arr = this.props.us_state_list.map(function (state) {
			return state.code;
		});

		var states = {};
		this.props.us_state_list.map(function (state) {
			return states[state.code] = state.name;
		});
		this.setState({"arr_state_names": state_names_arr});
		this.setState({"obj_states": states});
		this.setState({"state_name": state_names_arr[0]});
		var criteria_id = this.findCriteriaID(state_names_arr[0]);
		this.getCities(criteria_id);
		$("#location-form").validate({
			submitHandler: function () {
				this.handleSubmit();
			}.bind(this)
		});

	},

	//Handle submit makes an ajax call to create a new location
	handleSubmit: function () {

		var location_details = {
			name: this.state.name,
			category: this.state.category,
			addr_line_1: this.state.addr_line_1,
			addr_line_2: this.state.addr_line_2,
			url: this.state.url,
			zipcode: this.state.zipcode,
			country: this.state.country_name,
			"state": this.state.state_name,
			"city": this.state.city_name,
			"phone_number": this.state.phone_number
		};

		$.ajax({
			url: "/locations",
			type: "POST",
			data: {
				"location": location_details
			},
			dataType: "json",
			success: function (result) {
				window.location.assign("/locations/" + result.id);
			}.bind(this),
			error: function () {
				alert("Failed to save location");
			}.bind(this)
		});
	},

	render: function () {

		return (
			<form role="form" id="location-form">
				<p>{I18n.t("locations.form_titles.basic_information")}</p>
				<div className="form-group form-group-default required">
					<label>{I18n.t("locations.form_titles.business_name")}</label>
					<input id="name" type="text" className="form-control" name="name" onChange={this.handleChange.bind(this, "name")} required/>
				</div>
				<div className="form-group form-group-default required">
					<label>{I18n.t("locations.form_titles.business_category")}</label>
					<input type="number" className="form-control" name="category" onChange={this.handleChange.bind(this, "category")} required/>
				</div>
				<div className="form-group form-group-default input-group required">
					<span className="input-group-addon">https://</span>
					<label>{I18n.t("locations.form_titles.website")}</label>
					<input type="text" className="form-control" name="url" onChange={this.handleChange.bind(this, "url")} required/>
				</div>
				<br></br>
				<p>{I18n.t("locations.form_titles.location_details")}</p>
				<div className="form-group form-group-default required">
					<label>{I18n.t("locations.form_titles.address")}</label>
					<input type="text" className="form-control" name="addr_line_1" onChange={this.handleChange.bind(this, "addr_line_1")} required/>
				</div>
				<div className="row clearfix">
					<div className="col-md-6">
						<div className="form-group form-group-default required">
							<label>{I18n.t("locations.form_titles.country")}</label>
							<TL.Select2Component id="country_name" refValue="country_name" dataSet={this.state.countries} val={this.state.countries[0]} needFormatting={true} styleWidth="100%" callback={this.handleCallbackChange}/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group form-group-default required">
							<label>{I18n.t("locations.form_titles.state")}</label>
							<TL.Select2Component id="location_state_name" refValue="state_name" dataSet={this.state.arr_state_names} val={this.state.arr_state_names[0]} needFormatting={true} styleWidth="100%" callback={this.handleStateChange} optionsValueMap ={this.state.obj_states}/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						<div className="form-group form-group-default required">
							<label>{I18n.t("locations.form_titles.city")}</label>
							<TL.Select2Component id="location_city_name" placeholder="Select city" refValue="city_name" needFormatting={true} dataSet={this.state.cities_data} val={this.state.cities_data[0]} styleWidth="100%" callback={this.handleCallbackChange}/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group form-group-default required">
							<label>{I18n.t("locations.form_titles.zipcode")}</label>
							<input type="text" className="form-control" name="zipcode" onChange={this.handleChange.bind(this, "zipcode")} required/>
						</div>
					</div>
				</div>
				<div className="form-group form-group-default input-group required">
					<span className="input-group-addon">+1</span>
					<label>{I18n.t("locations.form_titles.phone_number")}</label>
					<input type="text" className="form-control" name="phone_number" onChange={this.handleChange.bind(this, "phone_number")} required/>
				</div>
				<div className="actions">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		);
	}
});
