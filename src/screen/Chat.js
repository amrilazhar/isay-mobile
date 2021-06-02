import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {color} from '../styles/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import socketIOClient from 'socket.io-client';
import {
  getChatRoomAct,
  chatMessageAct,
  getRoomListAct,
} from '../redux/action/Chat';
import {useSelector, useDispatch} from 'react-redux';
import {chatConstant} from '../redux/constant/chatTypes';
import MessageBox from '../components/common/MessageBox';
import store from '../redux/store';
import ImagePicker from 'react-native-image-crop-picker';

const ENDPOINT = 'https://isay.gabatch11.my.id';

const Chat = ({route, navigation}) => {
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  const [newImages, setNewImages] = useState([]); // Images to be sent

  const [receiverOnlineStatus, setReceiverOnlineStatus] = useState(null);
  const dispatch = useDispatch();

  const {receiver} = route.params;

  //get room ID
  const room = useSelector(state => state.getChatRoom);
  // get chat history
  const chatHistory = useSelector(state => state.getChatHistory);
  //handle new message
  const chatMessage = useSelector(state => state.setChatMessage.message);

  const socketRef = useRef();

  const openImagePicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(image => {
        sendImages([`data:${image.mime};base64,${image.data}`]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleNewMessageChange = text => {
    setNewMessage(text);
  };

  const handleSendMessage = () => {
    if (newImages.length > 0) {
      sendImages(newImages);
      setNewImages([]);
    }
    if (newMessage !== '') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  const startServer = room => {
    if (socketRef.current === undefined) {
      if (room === 'disconnect') {
        // Destroys the socket reference
        // when the connection is closed
        socketRef.current.disconnect();
      }
      // Creates a WebSocket connection

      socketRef.current = socketIOClient(ENDPOINT, {
        transports: ['websocket'],
        path: '/socket',
        upgrade: false,
        query: {roomID: room},
      });

      // Listens for incoming messages
      socketRef.current.off(chatConstant.NEW_CHAT_MESSAGE_FROM_SERVER);
      socketRef.current.on(
        chatConstant.NEW_CHAT_MESSAGE_FROM_SERVER,
        newMessage => {
          let checker = false;
          newMessage.receiver = receiver;
          store.getState().setChatMessage.message.forEach(item => {
            if (item._id == newMessage._id) {
              checker = true;
            }
          });
          if (!checker) {
            // combine old message and new message
            dispatch(
              chatMessageAct([
                ...store.getState().setChatMessage.message,
                newMessage,
              ]),
            );
          }
        },
      );
      socketRef.current.removeAllListeners('online:' + receiver);
      socketRef.current.on('online:' + receiver, status =>
        setReceiverOnlineStatus(status),
      );
      // Listens for update in read status of messages
      socketRef.current.removeAllListeners(
        chatConstant.UPDATED_READ_STATUS_MESSAGE_EVENT,
      );
      socketRef.current.on(
        chatConstant.UPDATED_READ_STATUS_MESSAGE_EVENT,
        newMessageID => {
          //set status message readed or not
          updateAllReadedStatus(newMessageID);
        },
      );
    }
  };

  const sendMessage = messageBody => {
    socketRef.current.emit(chatConstant.NEW_CHAT_MESSAGE_EVENT, {
      content: messageBody,
      chatRoom: room.roomData._id,
      to: receiver,
      message_type: 'text',
    });
  };

  //=============== Handle Send Images ========================

  const sendImages = messageBody => {
    messageBody.forEach((item, i) => {
      socketRef.current.emit(chatConstant.NEW_CHAT_MESSAGE_EVENT, {
        content: item,
        chatRoom: room.roomData._id,
        to: receiver,
        message_type: 'images',
      });
    });
  };
  //====================== END Handle Send Images =====================

  //============= Handle Read Status ============================
  const updateAllReadedStatus = messageId => {
    let found = false;
    chatHistory.message.forEach((item, idx) => {
      if (item._id == messageId) {
        chatHistory.message[idx].readed = true;
        found = true;
      }
    });
    if (!found) {
      chatMessage.forEach((item, idx) => {
        if (item._id == messageId) {
          chatMessage[idx].readed = true;
        }
      });
    }
  };
  //============= END Handle Read Status ========================

  //create display chat name
  const displayChatName = () => {
    if (!room.loading) {
      let name = '';
      let onlineStatus = false;
      let avatar = '';
      room.roomData.member.forEach((item, i) => {
        if (item._id.toString() === receiver.toString()) {
          name = item.name;
          onlineStatus = Boolean(item.onlineStatus);
          avatar = item.avatar;
        }
      });

      return (
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Messages');
              dispatch(getRoomListAct());
            }}>
            <MaterialIcons
              name="arrow-back-ios"
              size={25}
              color={color.white}
            />
          </TouchableOpacity>

          <View style={styles.container1}>
            <Image style={styles.logo} source={{uri: avatar}} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.name}>
              {receiverOnlineStatus === null
                ? onlineStatus
                  ? 'On'
                  : 'Off'
                : receiverOnlineStatus
                ? 'On'
                : 'Off'}
            </Text>
          </View>
        </View>
      );
    } else return <Text></Text>;
  };

  const renderChat = ({item}) => {
    return (
      <MessageBox
        key={`message-box-list-${item._id}`}
        navigation={navigation}
        item={item}
        receiver={receiver}
        socket={socketRef.current}
      />
    );
  };

  const displayChat = () => {
    let invertedMessage = [...chatHistory.message, ...chatMessage];
    return (
      <FlatList
        style={{height: '70%'}}
        inverted
        data={invertedMessage.reverse()}
        renderItem={renderChat}
        keyExtractor={item => 'chat-item-' + item._id}
      />
    );
  };

  const displayLoading = () => {
    return (
      <View style={[styles.loadContainer, styles.loadHorizontal]}>
        <ActivityIndicator size="large" color={color.blue1} />
      </View>
    );
  };

  useEffect(() => {
    if (room.init) {
      dispatch(getChatRoomAct(receiver));
    }

    return () => {
      if (socketRef.current !== undefined) {
        startServer('disconnect');
      }
    };
  }, []);

  const loadAllDisplay = () => {
    if (room.loading) {
      return displayLoading();
    } else {
      startServer(room.roomData._id);
      if (chatHistory.loading) {
        return displayLoading();
      } else {
        return [displayChatName(), displayChat()];
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      {loadAllDisplay()}
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <View style={styles.postComment}>
          <Feather
            name="image"
            size={25}
            color={color.grey4}
            onPress={() => openImagePicker()}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={color.grey1}
            placeholder={'Write a message'}
            onChangeText={text => handleNewMessageChange(text)}
            value={newMessage}
          />
          <MaterialCommunityIcons
            name="send-circle"
            size={40}
            color={color.blue1}
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.blue1,
    height: 65,
    padding: 20,
  },
  container1: {
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },

  ionicons: {
    color: color.grey1,
  },
  input: {
    color: 'white',
    color: color.black,
    width: '80%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: color.grey2,
    marginLeft:10
  },
  logo: {
    width: 45,
    height: 45,
  },
  name: {
    color: color.white,
    marginLeft: 20,
    fontSize: 18,
  },
  postComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: color.grey3,
  },
  chatSenderHead: {
    alignItems: 'flex-end',
  },
  chatReceiverHead: {
    alignItems: 'flex-start',
  },
  chatSender: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: color.purple2,
    padding: 10,
    width: '80%',
    marginTop: 5,
    textAlign: 'right',
  },
  chatReceiver: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: color.grey2,
    padding: 10,
    marginTop: 5,
    textAlign: 'left',
    width: '80%',
  },
});
