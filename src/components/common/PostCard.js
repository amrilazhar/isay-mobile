import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import CustomPersonalButton from './CustomPersonalButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {color} from '../../styles/color';
import {
  getMyProfileAction,
  getStatusByUserInterestAction,
} from '../../redux/action/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PostCard = ({
  name,
  status,
  navigation,
  image,
  likeCount,
  commentCount,
  postCreated,
  statusId,
  ownerId,
  userId,
  category,
  media,
}) => {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const myProfile = useSelector(state => state.user.myProfile);
  const timeCreated = moment(new Date(postCreated)).fromNow();
  const myId = myProfile.id;

  useEffect(() => {
    console.log('mediaimage', media);
    dispatch(getMyProfileAction());
    dispatch(getStatusByUserInterestAction());
  }, []);

  const handleLike = async () => {
    let url = `https://isay.gabatch11.my.id/status/like/${statusId}`;
    console.log('statusId', statusId);
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    axios({
      method: 'PUT',
      url: url,
      headers: {Authorization: AuthStr},
    })
      .then(({data}) => {
        console.log('markerdata', data);
        dispatch(getStatusByUserInterestAction());
        // success handling
      })
      .catch(err => {
        console.log('Error', err.message);
        // erro handling
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              style={styles.logo}
              source={{
                uri: `${image}`,
              }}
            />
          </View>
          <View>
            <Text style={styles.name}>{name}</Text>

            <Text>{timeCreated}</Text>
          </View>
        </View>
        <View>
          <CustomPersonalButton
            title={category}
            onPressButton={() => navigation.navigate('UserProfile', {userId})}
          />
        </View>
      </View>
      <Text style={styles.textPost}>{status}</Text>
      <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
        {media.map(item => {
          return (
            <View>
              <Image
                style={styles.imageContent}
                resizeMode="contain"
                source={{
                  uri: `${item}`,
                }}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.response}>
        <View style={styles.response1}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              setIsLike(!isLike);
              handleLike();
            }}>
            <AntDesign
              color={
                likeCount?.find(ids => myId == ids) ? color.blue2 : color.grey4
              }
              name="like1"
              size={20}
            />
            <Text style={styles.text1}>Like {likeCount.length} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.response2}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} />
          <Text
            onPress={() => navigation.navigate('StatusDetails', {statusId})}
            style={styles.text1}>
            Comments {commentCount}{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="chatbubbles-outline" size={20} />
          <Text
            style={styles.text1}
            onPress={() => navigation.navigate('Chat', {receiver: ownerId})}>
            Personal chat
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPost: {
    textAlign: 'justify',
    letterSpacing: 1,
    marginTop: 10,
  },
  text1: {
    textAlign: 'center',
    marginLeft: 3,
  },
  response: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    borderWidth: 1,
    borderColor: color.grey1,
    paddingHorizontal: 5,
  },
  response1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: color.grey1,
    height: 35,
  },
  response2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: color.grey1,
  },
  imageContent: {
    width: 100,
    marginTop: 5,
    height: 200,
    marginRight: 10,
  },
});
