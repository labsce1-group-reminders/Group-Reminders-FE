import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Role extends React.Component {
  state = {
    isAdmin: false,
    isManager: false,
    showJoinOrganization: false,
    showJoinCountry: false
  };
  render() {
    const { isAdmin, showJoinOrganization } = this.state;
    return (
      //   <div>
      //     {!showJoinOrganization && (
      //       <div>
      //         <div>
      //           <label>
      //             <input
      //               type="radio"
      //               value="admin"
      //               onClick={() =>
      //                 this.setState({ isAdmin: true, showJoinOrganization: true })
      //               }
      //             />
      //             I'm an admin
      //           </label>
      //         </div>
      //         <label>
      //           <input type="radio" value="country_manager" />
      //           I'm a country manager
      //         </label>
      //       </div>
      //     )}
      //     {showJoinOrganization && (
      //       <div>
      //         <div>
      //           <label>
      //             What's the name of your organization
      //             <div>
      //               <select value={this.state.value} onChange={this.handleChange}>
      //                 <option value="item1">Item 1</option>
      //                 <option value="item2">Item 2</option>
      //               </select>
      //             </div>
      //           </label>
      //         </div>
      //         <label>Can't find your organization add it here</label>
      //       </div>
      //     )}
      //   </div>
      <div>
        <h3>Please select your role:</h3>
        <div>
          <Link to="/admin">
            <button>Organization Administrator</button>
          </Link>
          <Link to="/manager">
            <button>Country Manager</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Role);
