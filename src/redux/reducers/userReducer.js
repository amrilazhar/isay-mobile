import * as types from '../constant/actionTypes';

const initialState = {
  loading: false,
  userDetail: {},
  location: {},
  status: {},
  detailsStatus: {},
  allComments: {},
};
// console.log('location list1', initialState.location);
// console.log('initialstateUserdetail', initialState.userDetail);

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        // status: {},
      });

    case types.GET_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        location: action.payload,
      });
    case types.GET_LOCATION_FAILURE:
      return Object.assign(state, {
        loading: false,
        error: action.error,
      });
    case types.GET_STATUS_BY_USER_INTEREST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        status: action.payload,
      });
    case types.GET_STATUS_BY_USER_INTEREST_FAILURE:
      return Object.assign(state, {
        loading: false,
        error: action.error,
      });
    case types.GET_STATUS_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        detailsStatus: action.payload,
      });
    case types.GET_STATUS_DETAILS_FAILURE:
      return Object.assign(state, {
        loading: false,
        error: action.error,
      });
    case types.GET_ALL_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        allComments: action.payload,
      });
    case types.GET_ALL_COMMENT_FAILURE:
      return Object.assign(state, {
        loading: false,
        error: action.error,
      });

    default:
      return state;
  }
};

export default userReducer;
