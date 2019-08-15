import React, { Component } from "react";

class UserRegistration extends Component {
  state = { value: ""};

  handleRegistration = () => {
    console.log("Register button clicked", this.state.value);
  };

  handleTextChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="m-5">
        <h5>Register User</h5>
        <ul>
          <li>
            <i>
              Select Address in metamask and input a user name. Then click on{" "}
              <b>Register</b>
            </i>
          </li>
        </ul>
        User:
        <input onChange={this.handleTextChange} value={this.state.value} className="m-2" type="text" id="userName" />
        <button
          onClick={this.handleRegistration}
          className="btn btn-primary m-2"
        >
          Register
        </button>
      </div>
    );
  }
}

export default UserRegistration;
