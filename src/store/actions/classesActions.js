import axios from "axios";
import "./notificationsActions";

export const FETCH_CLASSES_START = "FETCH_CLASSES_START";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAIL = "FETCH_CLASSES_FAIL";


const baseUrl = `${process.env.REACT_APP_API}/api`;

export const getClasses = () => dispatch => {
  console.log("Getting classes")  
  dispatch({ type: FETCH_CLASSES_START });
  axios
    .get(`${baseUrl}/classes`)
    .then(res => {
      console.log(res);  
      dispatch({ type: FETCH_CLASSES_SUCCESS, payload: res.data.classes });
    })
    .catch(err => dispatch({ type: FETCH_CLASSES_FAIL, payload: err }));
};