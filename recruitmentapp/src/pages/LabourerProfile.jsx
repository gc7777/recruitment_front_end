import React from "react";
import StarRatings from "react-star-ratings";
import MultiSelect from "react-multi-select-component";
import { createProfile } from "../api/LabourerApi";
import { getLabourerInfo } from "../api/LabourerApi";
import { updateProile } from "../api/LabourerApi";

export default class LabourerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      Email: "",
      City: "",
      Province: "",
      newlabourer: {},
      SafetyRating: 0,
      QualityRating: 0,
      availability: [],
      skills: [],
      skillsItems: [],
      availabilityItems: [],
      skilloptions: [
        { label: "Painting", value: "painting" },
        { label: "Welder", value: "welder" },
        { label: "Electrician", value: "electrician" },
        { label: "Carpentry", value: "carpentry" },
      ],
      dayoptions: [
        { label: "Sun", value: "Sunday" },
        { label: "Mon", value: "Monday" },
        { label: "Tue", value: "Tuesday" },
        { label: "Wed", value: "Wednesday" },
        { label: "Thu", value: "Thursday" },
        { label: "Fri", value: "Friday" },
        { label: "Sat", value: "Saturday" },
      ],
    };
  }

  componentDidMount() {
    // this.showProfileInfo();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.setState({ availability: [days[0], days[5]] });
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  initialCreate = (event) => {
    const TOKEN = this.props.auth.JWToken;
    var labourer = this.buildLabourerObject();
    console.log(JSON.stringify(labourer));
    // Data retrieved.
    createProfile({ TOKEN, labourer })
      .then((response) => {})
      .catch(function (error) {
        alert(error);
      });
    this.showProfileInfo();
  };

  addSkill = (value) => {
    this.setState({
      skillsItems: value,
    });
    // console.log(this.state.skillsItems);
    var d = [];
    for (var i = 0; i < value.length; i++) {
      if (this.state.skills.indexOf(value[i].label) == -1) {
        // this.state.skills.push(value[i].label);
        d.push(value[i].label);
      }
    }
    this.setState({
      skills: d,
    });
    // console.log(this.state.skills);
    //ready for post
  };

  showProfileInfo = async () => {
    const id = this.props.auth.profileId;
    console.log(id);
    const TOKEN = this.props.auth.JWToken;
    console.log(TOKEN);
    await getLabourerInfo({ TOKEN, id })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ labourer: data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  addDay = (value) => {
    this.setState({
      availabilityItems: value,
    });
    var d = [];
    for (var i = 0; i < value.length; i++) {
      if (this.state.skills.indexOf(value[i].value) == -1) {
        d.push(value[i].value);
      }
    }
    this.setState({
      availability: d,
    });
    // console.log(this.state.availability);
    //ready for post
  };

  buildLabourerObject = () => {
    var labourer = {
      firstName: this.state.FirstName,
      lastName: this.state.LastName,
      city: this.state.City,
      province: this.state.Province,
      isActive: true,
    };
    return labourer;
  };

  render() {
    return (
      <div>
        <h1> Labourer Profile</h1>
        <div className="lab-profile">
          <div>
            <div className="lab-profile-item">
              <h4>Safety Rating</h4>
              <StarRatings
                rating={this.state.SafetyRating}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Quality Rating</h4>
              <StarRatings
                rating={this.state.QualityRating}
                starRatedColor="blue"
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div className="lab-profile-item">
              <h4>Availability</h4>
              <ul className="lab-profile-list">
                {this.state.availability.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
            <div className="lab-profile-item">
              <h4>Do you want to update availabilty?</h4>
              <MultiSelect
                options={this.state.dayoptions}
                value={this.state.availabilityItems}
                onChange={this.addDay}
              />
            </div>
            <div className="lab-profile-item">
              <h4>Skills</h4>
              <ul className="lab-profile-list">
                {this.state.skills.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
            <div className="lab-profile-item">
              <h3>Do you want to update your Skills?</h3>
              <MultiSelect
                // options={this.state.options}
                options={this.state.skilloptions}
                value={this.state.skillsItems}
                onChange={this.addSkill}
              />
            </div>
          </div>
          <div>
            <form onSubmit={this.initialCreate}>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  id="FirstName"
                  className="form-control"
                  value={this.state.FirstName}
                  name="FirstName"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  id="LastName"
                  className="form-control"
                  value={this.state.LastName}
                  name="FirstName"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  id="Email"
                  className="form-control"
                  value={this.state.Email}
                  name="Email"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  id="City"
                  className="form-control"
                  value={this.state.City}
                  name="City"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label>Province</label>
                <input
                  type="text"
                  id="Province"
                  className="form-control"
                  value={this.state.Province}
                  name="Province"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary btn-block my-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
