import React, { Component } from "react";

class Painting extends Component {
  state = {
    iURL: this.props.iURL,
    name: this.props.name,
    artist: this.props.artist,
    description: this.props.description,
    owner: this.props.owner
  };

  handleAddPainting = () => {
    console.log("Adding painting", this);
  };

  handleAdoption = () => {
    console.log("adopting the paining", this);
  };

  handleStatus = () => {
    console.log("Get current status", this);
    this.setState({ owner: "newOwner" });
  };

  render() {
    return (
      <div className="container m-5 card" style={{ width: 600 }}>
        <img
          className="card-img-top m-2"
          src={process.env.PUBLIC_URL + this.state.iURL}
          alt="happy face"
        />
        <div className="card-body">
          <h6 className="card-title">
            {this.state.name} -{this.state.artist}
          </h6>
          <p className="card-text">{this.state.description}</p>
          <div className="badge">Adopted By: {this.state.owner}</div>
        </div>

        <div>
          <button
            onClick={this.handleAddPainting}
            className="btn btn-secondary m-2"
          >
            Add Painting
          </button>

          <button
            onClick={this.handleAdoption}
            className="btn btn-secondary m-2"
          >
            Adopt Painting
          </button>

          <button onClick={this.handleStatus} className="btn btn-secondary m-2">
            Current Adopter
          </button>
        </div>
      </div>
    );
  }
}

export default Painting;
