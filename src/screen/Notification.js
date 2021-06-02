import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color} from '../styles/color';
import NotificationCard from '../components/common/NotificationCard';
import {useSelector, useDispatch} from 'react-redux';
import {getNotification} from '../redux/action/Action';
import socketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {
  getStatusByUserInterestAction,
  getNotificationCount,
} from '../redux/action/Action';

const ENDPOINT = 'https://isay.gabatch11.my.id/';

const Notification = ({navigation}) => {
  const dispatch = useDispatch();
  //get notif state
  const loading = useSelector(state => state.user.loadingNotif);
  const notifList = useSelector(state => state.user.allNotification);

  const socketRefNotif = useRef();

  const changeNotifList = dataNotif => {
    dispatch(getNotification());
  };

  const renderItem = ({item}) => {
    return (
      <NotificationCard
        key={`notif-list-${item._id}`}
        navigation={navigation}
        dataNotif={item}
        socket={socketRefNotif.current}
      />
    );
  };

  const displayNotif = () => {
    if (loading === false) {
      return (
        <FlatList
          data={notifList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      );
    }
  };

  const displayLoading = () => {
    return (
      <View style={[styles.loadContainer, styles.loadHorizontal]}>
        <ActivityIndicator size="large" color={color.blue1} />
      </View>
    );
  };

  useEffect(() => {
    dispatch(getNotification());

    if (socketRefNotif.current === undefined) {
      socketRefNotif.current = socketIOClient(ENDPOINT, {
        transports: ['websocket'],
        path: '/socket',
        upgrade: false,
      });

      AsyncStorage.getItem('accessToken').then(token => {
        let decodedToken = jwt_decode(token);

        // Listens for incoming messages
        socketRefNotif.current.removeAllListeners('chat:' + decodedToken.profile);
        socketRefNotif.current.on('notif:' + decodedToken.profile, changeNotifList);
      });
      return () => {
        socketRefNotif.current.disconnect();
      };
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
            dispatch(getStatusByUserInterestAction());
            dispatch(getNotificationCount());
          }}>
          <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Notification</Text>
      </View>
      {loading === false ? displayNotif() : displayLoading()}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: color.blue2,
    height: 55,
  },
  textHeader: {
    color: color.white,
    fontSize: 18,
    marginLeft: 110,
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
