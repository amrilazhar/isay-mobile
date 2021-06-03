import React, {useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import {color} from '../styles/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Person from '../components/common/Person';
import socketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {getRoomListAct} from '../redux/action/Chat';
import {getStatusByUserInterestAction} from '../redux/action/Action';
import {useSelector, useDispatch} from 'react-redux';

const ENDPOINT = 'https://isay.gabatch11.my.id/';

const Messages = props => {
  const dispatch = useDispatch();
  const searchName = (event, value) => {};

  const changeMessageInRoomList = dataMessage => {
    dispatch(getRoomListAct());
  };

  //get room ID
  const roomList = useSelector(state => state.getRoomList);

  const renderItem = ({item}) => {
    return (
      <Person
        key={`room-list-${item._id}`}
        navigation={props.navigation}
        item={item}
      />
    );
  };
  const displayRoomList = () => {
    if (!roomList.loading) {
      return (
        <FlatList
          data={roomList.roomList}
          renderItem={renderItem}
          keyExtractor={item => 'room-list' + item._id}
        />
      );
    } else {
      return (
        <View style={[styles.loadContainer, styles.loadHorizontal]}>
          <ActivityIndicator size="large" color={color.blue1} />
        </View>
      );
    }
  };

  useEffect(() => {
    dispatch(getRoomListAct());
    const io = socketIOClient(ENDPOINT, {
      transports: ['websocket'],
      path: '/socket',
      upgrade: false,
    });

    AsyncStorage.getItem('accessToken').then(token => {
      let decodedToken = jwt_decode(token);
      io.removeAllListeners('chat:' + decodedToken.profile);
      // Listens for incoming messages
      io.on('chat:' + decodedToken.profile, changeMessageInRoomList);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            console.log('Messages.js line 90');
            dispatch(getStatusByUserInterestAction());
            props.navigation.navigate('Home');
          }}>
          <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        </TouchableOpacity>

        <View style={styles.container1}>
          <Text style={styles.message}>Messages</Text>
          {/* <Ionicons style={styles.ionicons} name="search" size={25} />
          <TextInput
            style={styles.input}
            placeholderTextColor={color.grey1}
            placeholder={'Search annonymous'}
          /> */}
        </View>
        {/* <Entypo name="dots-three-horizontal" size={25} color={color.white} /> */}
      </View>
      {displayRoomList()}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {flex: 1},
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: color.blue1,
    height: 55,
    padding: 10,
  },
  container1: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  ionicons: {
    color: color.grey1,
  },
  input: {
    color: 'white',
    color: color.black,
    paddingLeft: 10,
    width: '72%',
  },
  message: {
    color: color.white,
    marginLeft: '48%',
    // fontWeight: 'bold',
    fontSize: 18,
  },
});
