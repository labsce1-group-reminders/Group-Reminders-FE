// main page for displaying list of all training series
import React, {useEffect} from "react";
import {connect} from "react-redux";

import history from "history.js";
import {getClasses} from "store/actions";

import {Classes} from "./styles.js";
import {Typography} from "@material-ui/core/";

function Tab({id, getFiltered, getClasses, classes}) {
    useEffect(() => {
        getClasses();
    }, [getClasses, id]);

    return (

        <div style={{display: "flex", flexWrap: "wrap"}}>
            {getFiltered(classes).map(classObj =>  (
                    <Classes key={classObj.id}>
                        <div style={{cursor: "pointer"}}
                            onClick={()=> {
                                history.push(`/home/class/${classObj.id}`);
                            }}
                        >
                            <Typography variant="subtitle1">
                                {classObj.className}
                            </Typography>
                        </div>
                    </Classes>

                ))
            }
        </div>
    );
}

const mapStateToProps = state => {
    return ({
        classes: state.classesReducer.classes
    });
};

export default connect(
    mapStateToProps,
    {getClasses}
)(Tab);
//(withStyles(styles)(Tab));
