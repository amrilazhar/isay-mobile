import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {color} from '../../styles/color';
import axios from 'axios';
import {chatMessageAct, getChatRoomAct} from '../../redux/action/Chat';
import {
  getAnotherUserActivityAction,
  getStatusByUserInterestAction,
  getStatusDetailsAction,
  getPostByInterestAction,
} from '../../redux/action/Action';

const ActivityCard = ({
  avatar,
  name,
  type,
  content,
  postCreated,
  media,
  likeCount,
  commentCount,
  userId,
  navigation,
  statusId,
  category,
  ownerId,
}) => {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const myProfile = useSelector(state => state.user.myProfile);
  const postType = useSelector(state => state.user.getPostType);
  const timeCreated = moment(new Date(postCreated)).fromNow();
  const myId = myProfile.id;
 

  const handleLike = async () => {
    let statusLike = likeCount?.find(ids => myId == ids) ? 'unlike' : 'like';
    let url = `https://isay.gabatch11.my.id/status/${statusLike}/${statusId}`;
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);
    axios({
      method: 'PUT',
      url: url,
      headers: {Authorization: AuthStr},
    })
      .then(({data}) => {
        dispatch(getAnotherUserActivityAction(ownerId));
        if (postType === '' || postType === 'userInterest') {
          dispatch(getStatusByUserInterestAction());
        } else {
          dispatch(getPostByInterestAction(interestId));
        }
      })
      .catch(err => {
        console.log('Error', err.message);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        {type === 'like_status' ? (
          <Text>Like This Post</Text>
        ) : type === 'post_status' ? (
          <Text>Post</Text>
        ) : (
          <Text>Commented On</Text>
        )}
      </View>
      <View style={styles.container1}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              style={styles.logo}
              source={{
                uri: `${avatar}`,
              }}
            />
          </View>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text>{timeCreated}</Text>
          </View>
        </View>
        <View></View>
      </View>
      <Text style={styles.textPost}>{content}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        {media?.map(item => {
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
            <Text style={styles.text1}>Like {likeCount?.length} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.response2}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} />
          <TouchableOpacity
            onPress={() => {
              dispatch(getStatusDetailsAction(statusId));
              navigation.navigate('StatusDetails', {statusId, category});
            }}>
            <Text style={styles.text1}>Comments {commentCount?.length} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.response2}>
          <Ionicons name="chatbubbles-outline" size={20} />
          <Text
            style={styles.text1}
            onPress={() => {
              dispatch(getChatRoomAct(ownerId));
              dispatch(chatMessageAct([]));
              navigation.navigate('Chat', {receiver: ownerId});
            }}>
            Personal chat
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;

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
    marginLeft: 3,
  },
  response: {
    flexDirection: 'row',
    marginTop: 5,
    height: 40,
  },
  response1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.grey1,
    width: '23%',
    height: '100%',
    padding: 5,
  },
  response2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.grey1,
    width: '39%',
    height: '100%',
    padding: 5,
  },
  imageContent: {
    width: 130,
    marginTop: 5,
    height: 130,
    marginRight: 10,
  },
});
