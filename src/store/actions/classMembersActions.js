import axios from "axios";
import history from "../../history.js";

import "./notificationsActions";

export const FETCH_CLASS_START = "FETCH_CLASS_START";
export const FETCH_CLASS_SUCCESS = "FETCH_CLASS_SUCCESS";
export const FETCH_CLASS_FAIL = "FETCH_CLASS_FAIL";

export const FETCH_SINGLE_MEMBER_START = "FETCH_SINGLE_MEMBER_START";
export const FETCH_SINGLE_MEMBER_SUCCESS = "FETCH_SINGLE_MEMBER_SUCCESS";
export const FETCH_SINGLE_MEMBER_FAIL = "FETCH_SINGLE_MEMBER_FAIL";

export const ADD_MEMBER_START = "ADD_MEMBER_START";
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";
export const ADD_MEMBER_FAIL = " ADD_MEMBER_FAIL";

export const DELETE_MEMBER_START = "DELETE_MEMBER_START";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_FAIL = "DELETE_MEMBER_FAIL";

export const EDIT_MEMBER_START = "EDIT_MEMBER_START";
export const EDIT_MEMBER_SUCCESS = "EDIT_MEMBER_SUCCESS";
export const EDIT_MEMBER_FAIL = "EDIT_MEMBER_FAIL";

const baseUrl = `${process.env.REACT_APP_API}/api`;

export const getClassMember = () => dispatch => {
  dispatch({ type: FETCH_CLASS_START });
  axios
    .get(`${baseUrl}/class-member`)
    .then(res => {
      dispatch({ type: FETCH_CLASS_SUCCESS, payload: res.data.classMembers });
    })
    .catch(err => dispatch({ type: FETCH_CLASS_FAIL, payload: err }));
};

export const addClassMember = classMember => dispatch => {
  dispatch({ type: ADD_MEMBER_START });
  axios
    .post(`${baseUrl}/class-member`, classMember)
    .then(res => {
        console.log("class member res", res);
        dispatch({ type: ADD_MEMBER_SUCCESS, payload: res.data.newClassMembers });
    })
    .then(() => history.push({ pathname: "/home", state: { success: true } }))
    .catch(err => dispatch({ type: ADD_MEMBER_FAIL, payload: err }));
};

export const editClassMember = classMember => dispatch => {
  const { id, ...changes } = classMember;
  //destructuring forbidden properties here in the action since this function is called in multiple places in app
  //only submits valid fields to be changed, otherwise would throw Joi validation error

  dispatch({ type: EDIT_MEMBER_START });
  axios
    .patch(`${baseUrl}/class-member/${id}`, changes)
    .then(res => {
      dispatch({
        type: EDIT_MEMBER_SUCCESS,
        payload: res.data.updatedClassMember
      });
    })
    .catch(err => dispatch({ type: EDIT_MEMBER_FAIL, payload: err }));
};

export const deleteClassMember = (teamMemberID) => dispatch => {
  dispatch({ type: DELETE_MEMBER_START });
  axios
    .delete(`${baseUrl}/class-member/${teamMemberID}`)
    .then(() => {
      dispatch({ type: DELETE_MEMBER_SUCCESS, payload: teamMemberID });
    })
    .then(() => {
      if (history.location.pathname === "/home") {
      } else {
        history.push("/home");
      }
    })
    .catch(err => dispatch({ type: DELETE_MEMBER_FAIL, payload: err }));
};

export const getClassMemberByID = id => dispatch => {
  dispatch({ type: FETCH_SINGLE_MEMBER_START });

  axios
    .get(`${baseUrl}/class-member/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_MEMBER_SUCCESS,
        payload: res.data.classMember
      });
    })
    .catch(err => dispatch({ type: FETCH_SINGLE_MEMBER_FAIL, error: err }));
};
