import {
  FETCH_CLASSES_FAIL,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_START,
} from "../actions";

const initialState = {
  classes: [],
  error: null,
  status: {
    isLoading: false,
    loadSuccess: false,
    loadFailed: false,
  }
};

const classesReducer = (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
    case FETCH_CLASSES_START:
      return {
        ...state,
        status: {
          ...state.status,
          isLoading: true,
          loadSuccess: false,
          loadFailed: false
        }
      };
    case FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload,
        status: {
          ...state.status,
          isLoading: false,
          loadSuccess: true,
          loadFailed: false
        }
      };
    case FETCH_CLASSES_FAIL:
      return {
        ...state,
        error: action.payload,
        status: {
          ...state.status,
          loadFailed: true
        }
      };
    }
  }

export default classesReducer;