import {chatConstant} from '../constant/chatTypes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_SERVER_URL = 'https://isay.gabatch11.my.id';

export const getChatRoomAct = receiver => async dispatch => {
  dispatch({
    type: chatConstant.GET_CHAT_ROOM_BEGIN,
    loading: true,
    error: null,
  });

  const token = await AsyncStorage.getItem('accessToken');
  const AuthStr = 'Bearer '.concat(token);

  axios({
    method: 'post',
    url: SOCKET_SERVER_URL + '/chat/joinRoom',
    headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
    data: {
      to: receiver,
    },
  })
    .then(res => {
      dispatch({
        type: chatConstant.GET_CHAT_ROOM_SUCCESS,
        loading: false,
        payload: res.data.data,
      });
      dispatch(getChatHistoryAct(res.data.data._id));
    })

    .catch(err =>
      dispatch({
        type: chatConstant.GET_CHAT_ROOM_FAIL,
        loading: false,
        error: err,
      }),
    );
};

export const getChatHistoryAct = chatRoom => async dispatch => {
  dispatch({
    type: chatConstant.GET_CHAT_HISTORY_BEGIN,
    loading: true,
    error: null,
  });

  const token = await AsyncStorage.getItem('accessToken');
  const AuthStr = 'Bearer '.concat(token);

  axios({
    method: 'get',
    url: SOCKET_SERVER_URL + `/chat/messageHistory/${chatRoom}?limit=100`,
    headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
  })
    .then(res => {
      dispatch({
        type: chatConstant.GET_CHAT_HISTORY_SUCCESS,
        loading: false,
        payload: res.data,
        init : false,
      });
    })
    .catch(err =>
      dispatch({
        type: chatConstant.GET_CHAT_HISTORY_FAIL,
        loading: false,
        error: err,
      }),
    );
};

export const getOlderChatAct = (
  chatRoom,
  lastMessage,
  olderMessage,
) => async dispatch => {
  dispatch({
    type: chatConstant.GET_OLDER_CHAT_BEGIN,
    loading: true,
    error: null,
  });

  const token = await AsyncStorage.getItem('accessToken');
  const AuthStr = 'Bearer '.concat(token);

  axios({
    method: 'get',
    url:
      SOCKET_SERVER_URL +
      `/chat/loadMore?chatRoom=${chatRoom}&lastMessage=${lastMessage}&limit=30`,
      headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
  })
    .then(res => {
      dispatch({
        type: chatConstant.GET_OLDER_CHAT_SUCCESS,
        loading: false,
        payload: {new: res.data, old: olderMessage},
      });
    })

    .catch(err =>
      dispatch({
        type: chatConstant.GET_OLDER_CHAT_FAIL,
        loading: false,
        error: err,
      }),
    );
};

export const chatMessageAct = message => dispatch => {
  dispatch({
    type: chatConstant.SET_CHAT_MESSAGE_BEGIN,
    loading: true,
    error: null,
  });
  dispatch({
    type: chatConstant.SET_CHAT_MESSAGE_SUCCESS,
    loading: false,
    payload: message,
  });
};

export const readedStatus = messageID => dispatch => {
  dispatch({
    type: chatConstant.READED_STATUS_MESSAGE_BEGIN,
    loading: true,
    error: null,
  });
  dispatch({
    type: chatConstant.READED_STATUS_MESSAGE_SUCCESS,
    loading: false,
    payload: messageID,
  });
};

export const getRoomListAct = () => async dispatch => {
  dispatch({
    type: chatConstant.GET_ROOM_LIST_BEGIN,
    loading: true,
    error: null,
  });

  const token = await AsyncStorage.getItem('accessToken');
  const AuthStr = 'Bearer '.concat(token);

  axios({
    method: 'get',
    url: SOCKET_SERVER_URL + '/chat/roomList',
    headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
  })
    .then(res => {
      dispatch({
        type: chatConstant.GET_ROOM_LIST_SUCCESS,
        loading: false,
        payload: res.data.data,
      });
    })

    .catch(err =>
      dispatch({
        type: chatConstant.GET_ROOM_LIST_FAIL,
        loading: false,
        error: err,
      }),
    );
};
