import {
  FETCH_CLASS_FAIL,
  FETCH_CLASS_SUCCESS,
  FETCH_CLASS_START,
  ADD_MEMBER_START,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAIL,
  DELETE_MEMBER_START,
  DELETE_MEMBER_FAIL,
  DELETE_MEMBER_SUCCESS,
  EDIT_MEMBER_START,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_FAIL,
  FETCH_SINGLE_MEMBER_START,
  FETCH_SINGLE_MEMBER_SUCCESS,
  FETCH_SINGLE_MEMBER_FAIL,
} from "../actions";

const initialState = {
  classMembers: [],
  classMember: {},
  error: null,
  status: {
    isLoading: false,
    loadSuccess: false,
    isAdding: false,
    addSuccess: false,
    addFailed: false,
    loadFailed: false,
    isEditing: false,
    editSuccess: false,
    editFailed: false,
    isDeleting: false,
    deleteSuccess: false,
    deleteFailed: false,
    isAssigning: false,
    assignSuccess: false
  }
};

const classMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASS_START:
      return {
        ...state,
        status: {
          ...state.status,
          isLoading: true,
          loadSuccess: false,
          loadFailed: false
        }
      };
    case FETCH_CLASS_SUCCESS:
      return {
        ...state,
        classMembers: action.payload.reverse(),
        status: {
          ...state.status,
          isLoading: false,
          loadSuccess: true,
          loadFailed: false
        }
      };
    case FETCH_CLASS_FAIL:
      return {
        ...state,
        error: action.payload,
        status: {
          ...state.status,
          loadFailed: true
        }
      };
    case FETCH_SINGLE_MEMBER_START:
      return {
        ...state,
        classMember: {},
        status: {
          ...state.status,
          isLoading: true,
          loadSuccess: false,
          loadFailed: false
        }
      };
    case FETCH_SINGLE_MEMBER_SUCCESS:
      return {
        ...state,
        classMember: action.payload,
        status: {
          ...state.status,
          isLoading: false,
          loadSuccess: true,
          loadFailed: false
        }
      };
    case FETCH_SINGLE_MEMBER_FAIL: {
      return {
        ...state,
        state: {
          ...state.status,
          isLoading: false,
          loadSuccess: false,
          loadFailed: true
        }
      };
    }
    case ADD_MEMBER_START:
      return {
        ...state,
        status: {
          ...state.status,
          isAdding: true,
          addSuccess: false,
          addFailed: false
        }
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        classMembers: [...state.classMembers, action.payload],
        classMember: action.payload,
        status: {
          ...state.status,
          isAdding: false,
          addSuccess: true,
          addFailed: false
        }
      };
    case ADD_MEMBER_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          addFailed: true
        },
        error: action.payload
      };

    case EDIT_MEMBER_START:
      return {
        ...state,
        status: {
          ...state.status,
          isEditing: true,
          editSuccess: false,
          editFailed: false
        }
      };
    case EDIT_MEMBER_SUCCESS:
      const updatedMembers = state.classMembers.map(member => {
        if (member.id === action.payload.id) {
          return {
            ...member,
            ...action.payload
          };
        } else {
          return member;
        }
      });
      return {
        ...state,
        classMembers: updatedMembers,
        status: {
          ...state.status,
          isEditing: false,
          editSuccess: true
        }
      };

    case EDIT_MEMBER_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          editFailed: true,
          editSuccess: false
        },
        error: action.payload
      };

    case DELETE_MEMBER_START:
      return {
        ...state,
        status: {
          ...state.status,
          isDeleting: true,
          deleteFailed: false,
          deleteSuccess: false
        }
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        classMembers: [
          ...state.classMembers.filter(member => member.id !== action.payload)
        ],
        status: {
          ...state.status,
          isDeleting: false,
          deleteSuccess: true
        }
      };
    case DELETE_MEMBER_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          deleteSuccess: false,
          deleteFailed: true
        },
        error: action.payload
      };
    default:
      return state;
  }
};

export default classMembersReducer;
