import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  LogBox,
  Animated,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {color} from '../styles/color';
import {TextInput} from 'react-native-gesture-handler';
import {
  getInterestAction,
  getMyProfileAction,
  getStatusByUserInterestAction,
} from '../redux/action/Action';

import Modal from 'react-native-modal';

const Post = props => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [interest, setInterest] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const options = useSelector(state => state.user.interest);
  const myProfile = useSelector(state => state.user.myProfile);

  useEffect(() => {
    dispatch(getInterestAction());
    dispatch(getMyProfileAction());
    dispatch(getStatusByUserInterestAction());
  }, []);

  const renderItem = ({item}) => {
    // console.log('item', item);

    return (
      <TouchableOpacity
        onPress={() => {
          setInterest(item._id);
          toggleModal();
        }}>
        <Text
          style={{
            marginLeft: 17,
            marginVertical: 7,
            borderBottomWidth: 1,
            borderColor: color.grey2,
          }}>
          {item.interest}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const post = async () => {
    let url = 'https://isay.gabatch11.my.id/status/';
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    try {
      const {data} = await axios({
        method: 'POST',
        url: url,
        data: {
          content,
          interest,
          media,
        },
        headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      });
      setContent('');
      setInterest('');
      setMedia('');
      dispatch(getStatusByUserInterestAction());
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch(getStatusByUserInterestAction());
            props.navigation.goBack('MainTab');
          }}>
          <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Post</Text>
        <Entypo name="dots-three-horizontal" size={25} color={color.white} />
      </View>
      <View style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                style={styles.logo}
                source={{
                  uri: `${myProfile?.avatar}`,
                }}
              />
            </View>
            <View>
              <Text style={styles.name}>{myProfile?.name}</Text>
              <Text style={styles.location}>
                {myProfile?.location?.province}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.buttonTopic}>
              <Text style={styles.topic}>Topic</Text>
              <AntDesign name="down" size={20} color={color.blue2} />
            </View>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder={'What would you like to say today?'}
          value={content}
          onChangeText={setContent}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.container2}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <View style={styles.buttonContainer1}>
              <Feather name="image" size={18} color={color.black} />
              <Text style={styles.buttonTitle}>Image</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={post} style={styles.post}>
            <Text style={{color: color.white}}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
        onBackdropPress={toggleModal}
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        useNativeDriver={true}
        animationInTiming={1000}>
        <View
          style={{
            backgroundColor: color.white,
            borderColor: 'black',

            borderColor: 'white',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              marginVertical: 5,
              fontWeight: 'bold',
            }}>
            What is this Post About
          </Text>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{textAlign: 'center', marginVertical: 10}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: color.blue2,
    height: 55,
  },
  textHeader: {
    color: color.white,
    fontSize: 18,
  },
  logo: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    color: color.grey4,
    marginTop: 5,
  },
  textInput: {
    marginTop: 20,
  },
  buttonContainer: {
    height: 33,
    backgroundColor: color.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: color.grey1,
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonTitle: {
    fontSize: 14,
    color: color.black,
    marginLeft: 5,
  },
  container2: {
    marginBottom: 60,
    padding: 10,
    backgroundColor: color.grey3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  post: {
    height: 33,
    backgroundColor: color.blue1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: color.grey1,
  },
  topic: {
    fontSize: 15,
    color: color.blue2,
    marginRight: 5,
    fontWeight: 'bold',
  },
  buttonTopic: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    padding: 7,
    borderColor: color.blue2,
  },
});
