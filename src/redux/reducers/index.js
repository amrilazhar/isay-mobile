import {combineReducers} from 'redux';

import userReducer from './userReducer';
import {
  getOlderChat,
  getChatRoom,
  getChatHistory,
  setChatMessage,
  setReadedStatus,
  getRoomList,
} from './chatReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  getChatRoom,
  getChatHistory,
  setChatMessage,
  setReadedStatus,
  getOlderChat,
  getRoomList,
});

export default rootReducer;
