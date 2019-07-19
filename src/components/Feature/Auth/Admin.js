import React from "react";
import {getOrganizations, registerUser} from "store/actions";
import {connect} from "react-redux";
import {Paper, Input, Typography} from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

class Admin extends React.Component {
    componentDidMount() {
        this.props.getOrganizations();
    }

    render() {

        const {classes} = this.props;
        return (
            <Paper className={classes.organizationCreate}>
                <div className={classes.marginBottomXL}>
                    <Typography >
                        Create Organization
                    </Typography>
                    <Input value={this.props.value}
                           placeholder={"Create organization"}
                           onChange={this.props.changeHandler}
                           name={"organization"}
                    />
                </div>

                {this.props.organizations.length > 0  ?
                    <>
                        <Divider />
                        <Typography className={classes.textTitle}>
                            Or join Organization from bellow
                        </Typography>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="age-customized-select">Organization</InputLabel>
                            <Select
                                value={this.props.value}
                                onChange={this.props.changeHandler}
                                inputProps={{
                                    name: 'organization',
                                }}
                                style={{
                                    marginTop: "16px",
                                    width: "150px",
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                {this.props.organizations.map(({name, id}) =>
                                    <MenuItem value={name} key={id}>{name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                    </> :
                    <Typography className={classes.instructions}>
                        Create Organization to be part of!
                    </Typography>
                }
            </Paper>
        );
    }
}

const DispatchStateToProps = state => ({
    organizations: state.organizationsReducer.organizations
});
export default connect(DispatchStateToProps, {getOrganizations, registerUser})(Admin);
