import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import CustomPersonalButton from '../components/common/CustomPersonalButton';
import {getMyProfileAction} from '../redux/action/Action';
import {color} from '../styles/color';

const Profile = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const myProfile = useSelector(state => state.user.myProfile);
  const list = myProfile.interest;
  const [bio, setBio] = useState('');


  useEffect(() => {
    dispatch(getMyProfileAction());
  }, []);

  const renderItem = ({item}) => {
    return <CustomPersonalButton title={item.interest} />;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const updateBio = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    var FormData = require('form-data');
    var data = new FormData();
    data.append('bio', bio);

    var config = {
      method: 'put',
      url: 'https://isay.gabatch11.my.id/profile',
      headers: {
        Authorization: AuthStr, 'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(getMyProfileAction());
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, padding: 12}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.bio}>Bio</Text>
        <TouchableOpacity></TouchableOpacity>
        <Feather
          name="edit"
          size={25}
          color={color.black}
          onPress={() => {
            toggleModal();
          }}
        />
      </View>
      <Text style={styles.bioContent}>{myProfile?.bio}</Text>
      <View style={styles.container1}>
        <Text style={styles.bio}>Interest Topic</Text>
        <Feather name="edit" size={25} color={color.black} />
      </View>
      <View>
        <FlatList
          horizontal
          data={list}
          renderItem={renderItem}
          keyExtractor={item => `home-post-card-${item._id}`}
        />
      </View>
      {/* ======SHOW MODAL===== */}
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
            Edit Your Bio
          </Text>
          <View>
            <TextInput
              style={styles.bioModal}
              multiline={true}
              placeholderTextColor={color.grey1}
              placeholder={myProfile.bio}
              value={bio}
              onChangeText={setBio}
            />
          </View>
          <View style={styles.finishButton}>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                updateBio();
                dispatch(getMyProfileAction());
              }}>
              <Text style={styles.textbutton}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ====MODAL==== */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bio: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  bioContent: {
    textAlign: 'justify',
    marginHorizontal: 5,
  },
  bioModal: {
    height: 200,
    marginHorizontal: '5%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.grey1,
    textAlignVertical: 'top',
  },
  finishButton: {
    marginVertical: 10,
    marginHorizontal: '10%',
    backgroundColor: color.blue1,
    borderRadius: 5,
  },
  textbutton: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
