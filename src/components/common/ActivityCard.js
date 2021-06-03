import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {color} from '../../styles/color';
import axios from 'axios';

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
}) => {
  const dispatch = useDispatch();
  const timeCreated = moment(new Date(postCreated)).fromNow();
  const [isLike, setIsLike] = useState(false);
  const myProfile = useSelector(state => state.user.myProfile);
  const myId = myProfile.id;

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
        // console.log('markerdata', data);
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
      <View>
        {type == 'post_comment' ? (
          <Text>Commented On This Post</Text>
        ) : (
          <Text>Like This Post</Text>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="chatbubbles-outline" size={20} />
          <Text
            style={styles.text1}
            onPress={() => {
              dispatch(getChatRoomAct(userId));
              dispatch(chatMessageAct([]));
              navigation.navigate('Chat', {receiver: userId});
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
    width: 130,
    marginTop: 5,
    height: 130,
    marginRight: 10,
  },
});