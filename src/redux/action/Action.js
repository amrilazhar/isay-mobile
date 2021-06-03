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

const getInterestSuccess = interest => ({
  type: types.GET_INTEREST_SUCCESS,
  payload: interest,
});

const getInterestFailure = error => ({
  type: types.GET_INTEREST_FAILURE,
  error,
});

const getMyProfileSuccess = myProfile => ({
  type: types.GET_MY_PROFILE_SUCCESS,
  payload: myProfile,
});

const getMyProfileFailure = error => ({
  type: types.GET_MY_PROFILE_FAILURE,
  error,
});

const getHistoryPostSuccess = historyPost => ({
  type: types.GET_HISTORY_POST_SUCCESS,
  payload: historyPost,
});

const getHistoryPostFailure = error => ({
  type: types.GET_HISTORY_POST_FAILURE,
  error,
});

const getAnotherProfileSuccess = anotherProfile => ({
  type: types.GET_ANOTHER_PROFILE_SUCCESS,
  payload: anotherProfile,
});

const getAnotherProfileFailure = error => ({
  type: types.GET_ANOTHER_PROFILE_FAILURE,
  error,
});

const getAnotherHistoryPostSuccess = AnotherHistoryPost => ({
  type: types.GET_ANOTHER_HISTORY_POST_SUCCESS,
  payload: AnotherHistoryPost,
});

const getAnotherHistoryPostFailure = error => ({
  type: types.GET_ANOTHER_HISTORY_POST_FAILURE,
  error,
});

const getNotificationBegin = () => ({
  type: types.GET_ALL_NOTIFICATION_BEGIN,
  loadingNotif: true,
  payload: [],
});

const getNotificationSuccess = notif => ({
  type: types.GET_ALL_NOTIFICATION_SUCCESS,
  loadingNotif: false,
  payload: notif,
});

const getNotificationFailure = error => ({
  type: types.GET_ALL_NOTIFICATION_FAILURE,
  loadingNotif: false,
  error,
});

const getNotificationCountSuccess = data => ({
  type: types.GET_ALL_NOTIFICATION_COUNT_SUCCESS,
  payload: data,
});

const getNotificationCountFailure = error => ({
  type: types.GET_ALL_NOTIFICATION_COUNT_FAILURE,
  error,
});

const getMyActivitySuccess = myActivity => ({
  type: types.GET_MY_ACTIVITY_SUCCESS,
  payload: myActivity,
});

const getMyActivityFailure = error => ({
  type: types.GET_MY_ACTIVITY_FAILURE,
  error,
});

const getPostByInterestSuccess = postByInterest => ({
  type: types.GET_POST_BY_INTEREST_SUCCESS,
  payload: postByInterest,
});

const getPostByInterestFailure = error => ({
  type: types.GET_POST_BY_INTEREST_FAILURE,
  error,
});

const getAnotherUserActivitySuccess = anotherUserActivity => ({
  type: types.GET_ANOTHER_USER_ACTIVITY_SUCCESS,
  payload: anotherUserActivity,
});

const getAnotherUserActivityFailure = error => ({
  type: types.GET_ANOTHER_USER_ACTIVITY_SUCCESS,
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
  let url = 'https://isay.gabatch11.my.id/status/interest/loadmore?limit=20';
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
      // console.log('allcomments', response.data);
    } catch (error) {
      console.log('Error', error);
      dispatch(getAllCommentSuccess({data: {comments: {}}}));
    }
  };
};

export const getInterestAction = () => {
  let url = 'https://isay.gabatch11.my.id/utils/interest/topic';
  return async dispatch => {
    dispatch(getRequest());
    try {
      const response = await axios.get(url);
      dispatch(getInterestSuccess(response.data.data));
      // console.log(response.data.data);
    } catch (error) {
      console.log('Error', error);
      dispatch(getInterestFailure(error));
    }
  };
};

export const getMyProfileAction = () => {
  let url = 'https://isay.gabatch11.my.id/profile/getProfile';
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getMyProfileSuccess(response.data.data));
    } catch (error) {
      console.log('Error', error);
      dispatch(getMyProfileFailure);
    }
  };
};

export const getHistoryPostAction = () => {
  let url = 'https://isay.gabatch11.my.id/status/users/?page=1&limit=50';
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getHistoryPostSuccess(response.data.data));
      // console.log('result', response.data.data.docs);
    } catch (error) {
      console.log('Error', error);
      dispatch(getHistoryPostFailure);
    }
  };
};

// export const posStatusActions = async (content, interest, media) => {
//   let url = 'https://isay.gabatch11.my.id/status/';
//   const token = await AsyncStorage.getItem('accessToken');
//   const AuthStr = 'Bearer '.concat(token);
//   try {
//     const {data} = axios({
//       method: 'POST',
//       url: url,
//       data: {
//         content,
//         interest,
//         media,
//       },
//       headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
//     });

//   } catch (error) {
//     console.log('err', error);
//   }
// };

export const getAnotherProfileAction = userId => {
  let url = `https://isay.gabatch11.my.id/profile/an/${userId}`;
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getAnotherProfileSuccess(response.data.data));
    } catch (error) {
      console.log('Error', error);
      dispatch(getAnotherProfileFailure(error));
    }
  };
};

export const getNotification = () => {
  let url = 'https://isay.gabatch11.my.id/notif?page=1&limit=100';

  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    try {
      dispatch(getNotificationBegin());
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getNotificationSuccess(response.data.data));
    } catch (error) {
      console.log('Error', error);
      dispatch(getNotificationFailure(error));
    }
  };
};

export const getAnotherHistoryPostAction = userId => {
  let url = `https://isay.gabatch11.my.id/profile/an/Post/${userId}?page=1&limit=50`;
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getAnotherHistoryPostSuccess(response.data.data));
    } catch (error) {
      console.log('Error', error);
      dispatch(getAnotherHistoryPostFailure(error));
    }
  };
};

export const getNotificationCount = () => {
  let url = 'https://isay.gabatch11.my.id/notif/unreadNotif';

  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getNotificationCountSuccess(response.data));
    } catch (error) {
      console.log('Error', error);
      dispatch(getNotificationCountFailure(error));
    }
  };
};

export const getMyActivityAction = () => {
  let url = `https://isay.gabatch11.my.id/profile/Activities`;
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getMyActivitySuccess(response.data.data.docs));
    } catch (error) {
      console.log('Error', error);
      dispatch(getMyActivityFailure(error));
    }
  };
};

export const getPostByInterestAction = interestId => {
  let url = `https://isay.gabatch11.my.id/status/interest/${interestId}/loadmore/?limit=30`;
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getStatusByUserInterestSucces(response.data.data));
    } catch (error) {
      console.log('Error', error);
      dispatch(getPostByInterestFailure(error));
    }
  };
};

export const getAnotherUserActivityAction = userId => {
  let url = `https://isay.gabatch11.my.id/profile/an/Activities/${userId}`;
  return async dispatch => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    dispatch(getRequest());
    try {
      const response = await axios.get(url, {
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      dispatch(getAnotherUserActivitySuccess(response.data.data));
    } catch (error) {
      console.log('Error', error);
      dispatch(getAnotherUserActivityFailure(error));
    }
  };
};
