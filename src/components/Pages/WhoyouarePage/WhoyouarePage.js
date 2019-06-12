import React from "react";

class WhoYouArePage extends React.Component {
    state = {
        isAdmin:false,
        showJoinOrganization: false
    }
    render() {
        const {isAdmin, showJoinOrganization} = this.state
        console.log("rendering")
        return (
        <div>
            {!showJoinOrganization && (
            <div>
               <div>
                <label>
                    <input type="radio" value="admin" onClick={()=> this.setState({isAdmin: true, showJoinOrganization: true})}/>
                    I'm an admin
                    </label>
                </div>
                <label>
                   <input type="radio" value="country_manager"/>
                   I'm a country manager
                </label>
            </div>)}
            {showJoinOrganization && (
                <div>
                    <div>
                    <label>
                        What's the name of your organization
                        <div>
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="item1">Item 1</option>
                                <option value="item2">Item 2</option>
                            </select>
                        </div>
                    </label>
                    </div>
                    <label>
                        Can't find your organization add it here 
                    </label>
                </div>
            )}
        </div>
        );
    }
}

export default WhoYouArePage;