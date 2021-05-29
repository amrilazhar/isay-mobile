import * as types from '../constant/actionTypes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getRequest = () => ({
  type: types.GET_REQUEST,
});

const getLocationSuccess = location => ({
  type: types.GET_LOCATION_SUCCESS,
  payload: location,
});

const getLocationFailure = error => ({
  type: types.GET_LOCATION_FAILURE,
  error,
});

const getStatusByUserInterestSucces = status => ({
  type: types.GET_STATUS_BY_USER_INTEREST_SUCCESS,
  payload: status,
});

const getStatusByUserInterestFailure = error => ({
  type: types.GET_STATUS_BY_USER_INTEREST_FAILURE,
  error,
});

const getstatusDetailsSuccess = detailsStatus => ({
  type: types.GET_STATUS_DETAILS_SUCCESS,
  payload: detailsStatus,
});

const getStatusDetailsFailure = error => ({
  type: types.GET_STATUS_DETAILS_FAILURE,
  error,
});

const getAllCommentSuccess = allComments => ({
  type: types.GET_ALL_COMMENT_SUCCESS,
  payload: allComments,
});

const getAllCommentFailure = error => ({
  type: types.GET_ALL_COMMENT_FAILURE,
  error,
});

export const getLocationAction = () => {
  let url = 'https://isay.gabatch11.my.id/utils/location';
  return async dispatch => {
    dispatch(getRequest());
    try {
      const response = await axios.get(url);
      dispatch(getLocationSuccess(response.data.data));
      // console.log('list location', response.data.data);
    } catch (error) {
      console.log('Error', error);
      dispatch(getLocationFailure(error));
    }
  };
};

export const getStatusByUserInterestAction = () => {
  let url = 'https://isay.gabatch11.my.id/status/interest/loadmore?limit=100';

  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getStatusByUserInterestSucces(response.data.data));
      // console.log('statusredux', response.data.data);
    } catch (error) {
      console.log('Error', error);
      dispatch(getStatusByUserInterestFailure(error));
    }
  };
};

export const getStatusDetailsAction = statusId => {
  let url = `https://isay.gabatch11.my.id/status/${statusId}`;
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getstatusDetailsSuccess(response.data.data));
      // console.log('statusredux', response.data.data);
    } catch (error) {
      console.log('Error', error);
      dispatch(getStatusDetailsFailure(error));
    }
  };
};

export const getAllCommentAction = statusId => {
  let url = `https://isay.gabatch11.my.id/comment?status_id=${statusId}`;

  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());

    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getAllCommentSuccess(response.data));
      console.log('allcomments', response.data);
    } catch (error) {
      console.log('Error', error);
      dispatch(getAllCommentSuccess({data:{comments:{}}}));
    }
  };
};
