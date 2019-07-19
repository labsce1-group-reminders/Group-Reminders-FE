import React from "react";
import {me, registerUser} from "store/actions/userActions";
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, Button, Typography, Card, CardActionArea} from '@material-ui/core';

import Manager from "./Manager";
import Admin from "./Admin";
import useStyles from "./styles"

class Role extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_admin: false,
            is_manager: false,
            country: "",
            organization: "",
            activeStep: 0,
            steps: ['Select role', 'Create Profile', 'Create an ad'],
            skipped: new Set(),
        };
    }

    handleNext = () => {

        let newSkipped = this.state.skipped;
        if (this.isStepSkipped(this.state.activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(this.state.activeStep);
        }

        this.setState({activeStep: this.state.activeStep + 1, skipped: newSkipped})
    };
    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1})
    };
    handleReset = () => {
        this.setState({activeStep: 0})
    };
    isStepSkipped = (step) => {
        return this.state.skipped.has(step);
    };
    isStepOptional = (step) => {
        return step === 2;
    };

    getStepContent = (step, classes) => {
        switch (step) {
            case 0:
                return <div className={classes.flex}>
                            <Card onClick={()=>{
                                this.setState({ is_admin: true, is_manager: false,  activeStep: this.state.activeStep + 1})
                            }}> <CardActionArea className={classes.card}> Admin </CardActionArea></Card>
                            <Card onClick={()=>{
                                this.setState({ is_manager: true, is_admin: false, activeStep: this.state.activeStep + 1})
                            }}><CardActionArea className={classes.card}> Manager </CardActionArea></Card>
                        </div>;
            case 1:
                return this.state.is_admin ?
                    <Admin value={this.state.organization} changeHandler={this.changeHandler} classes={classes} /> :
                    <Manager value={this.state.country} changeHandler={this.changeHandler} classes={classes}/>;
            case 2:
                return 'Final stage';
            default:
                return 'Unknown step';
        }
    };
    handleSkip = () => {
        if (!this.isStepOptional(this.state.activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState({activeStep: this.state.activeStep + 1});
        this.setState(prevState => {
            const newSkipped = new Set(prevState.skipped.values());
            newSkipped.add(this.state.activeStep);
            return newSkipped;
        });
    };

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    registerUserHandler = () => {
        let userType = this.state.is_admin ? "admin" : "manager";
        let country = this.state.country.length > 1 ? this.state.country : null;
        this.props.registerUser(userType, country);
    };

    render() {
        const {activeStep, steps} = this.state;
        const {classes} = this.props;
        return (
                <div className={classes.root}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (this.isStepOptional(index)) {
                                labelProps.optional = <Typography variant="caption">Optional</Typography>;
                            }
                            if (this.isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={this.handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </>
                        ) : (
                            <>
                                {/*<Typography*/}
                                    {/*className={classes.instructions}></Typography>*/}
                                {this.getStepContent(activeStep, classes)}
                                <div className={classes.flexCentered}>
                                    <Button disabled={activeStep === 0} onClick={this.handleBack}
                                            className={classes.button}>
                                        Back
                                    </Button>
                                    {this.isStepOptional(activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleSkip}
                                            className={classes.button}
                                        >
                                            Skip
                                        </Button>
                                    )}

                                    {
                                        activeStep !== steps.length - 1 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                             Next
                                        </Button>
                                            :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.registerUserHandler}
                                            className={classes.button}
                                        >
                                            Finish
                                        </Button>
                                    }
                                </div>
                            </>
                        )}
                    </>
                </div>
        );
    }
}

const dispatchStateToProps = (state) => ({
    isUserAllowed: state.userReducer.userProfile.user
});
export default connect(dispatchStateToProps, {me, registerUser})(withStyles(useStyles)(Role))
// export default ;
