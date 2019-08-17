import React, { Component } from "react";

class Painting extends Component {

  render() {
    return (
      <div className="container m-5 card" style={{ width: 600 }}>
        <img
          className="card-img-top m-2"
          src={process.env.PUBLIC_URL + this.props.painting.iURL}
          alt="happy face"
        />
        <div className="card-body">
          <h6 className="card-title">
            {this.props.painting.name} -{this.props.painting.artist}
          </h6>
          <p className="card-text">{this.props.painting.description}</p>
          <div className="badge" style={{color: 'green'}}>Adopt For {this.props.painting.value} wei </div>
          <div className="badge">Adopted By: {this.props.painting.owner}</div>
        </div>

        <div>
          <button
            onClick={()=>this.props.onAdd(this.props.painting)}
            className="btn btn-secondary m-2"
          >
            Add Painting
          </button>

          <button
            onClick={()=>this.props.onAdopt(this.props.painting)}
            className="btn btn-secondary m-2"
          >
            Adopt
          </button>

          <button onClick={()=>this.props.onSet(this.props.painting)} className="btn btn-secondary m-2">
            Set Name
          </button>
          
          <button
            onClick={()=>this.props.onExpiry(this.props.painting)}
            className="btn btn-secondary m-2"
          >
            Reverse Adoption
          </button>
        </div>
      </div>
    );
  }
}

export default Painting;
