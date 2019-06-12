import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Admin extends React.Component {
  render() {
    return (
      <div>
        <h3>Please enter an organization:</h3>
        <div>
          <input />
        </div>
        <h4>Or select one to join:</h4>
        <div>
          <select>
            <option value="item1">Organization 1</option>
            <option value="item2">Organization 2</option>
          </select>
        </div>
        <div>
          <Link to="/home">
            <button>Submit</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Admin);
