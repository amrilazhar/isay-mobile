import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//Icon

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';

import CustomPersonalButton from './CustomPersonalButton';
import {color} from '../../styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  getAllCommentAction,
  getStatusByUserInterestAction,
  getStatusDetailsAction,
} from '../../redux/action/Action';
import {FlatList} from 'react-native-gesture-handler';

const CardStatusDetails = ({statusId, navigation}) => {
  // post comment //
  const status_id = statusId;
  const [content, setContent] = useState('');
  // ========== //
  const dispatch = useDispatch();

  const postDetails = useSelector(state => state.user.detailsStatus);
  const loading = useSelector(state => state.user.loading)
  const timeCreated = moment(new Date(postDetails.created_at)).fromNow();
  const comments = useSelector(state => state.user.allComments);

  
  useEffect(() => {
    // console.log('postdetails',postDetails);
    
    dispatch(getAllCommentAction(status_id));
  }, []);

  

  const addComment = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);

    axios({
      method: 'POST',
      url: `https://isay.gabatch11.my.id/comment/`,
      headers: {Authorization: AuthStr},

      data: {
        content,
        status_id,
      },
    })
      .then(({data}) => {
        setContent('');
        dispatch(getAllCommentAction(status_id));
        dispatch(getStatusByUserInterestAction());
      })
      .catch(err => {
        // setContent('');
        alert(err.message);
      });
  };

  const displayComments = () => {
    if (!comments.loading && comments.data != undefined) {
      let arrayContainer = [];
      for (const iterator of Object.values(comments.data.comments)) {
        arrayContainer.push(iterator);
      }
      return (
        <FlatList
          data={arrayContainer}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <View style={styles.comments}>
                <View style={styles.user}>
                  <Text style={styles.name1}>{item?.owner?.name}</Text>
                  <Text style={styles.time}>
                    {moment(item.created_at).startOf('day').fromNow()}
                  </Text>
                </View>
                <Text style={styles.textc}>{item?.content}</Text>
              </View>
            );
          }}
        />
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Text> loading </Text>
      ) : (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                dispatch(getStatusByUserInterestAction());
                navigation.navigate('MainTab');
              }}>
              <MaterialIcons
                name="arrow-back-ios"
                size={25}
                color={color.white}
              />
            </TouchableOpacity>
            <Entypo
              name="dots-three-horizontal"
              size={25}
              color={color.white}
            />
          </View>
          <View style={styles.container}>
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
                      uri: `${postDetails?.owner?.avatar}`,
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.name}>{postDetails?.owner?.name}</Text>
                  <Text>{timeCreated}</Text>
                </View>
              </View>
              <View>
                <CustomPersonalButton
                  title={
                    postDetails?.interest[0].interest
                      ? postDetails.interest[0].interest
                      : 'waiting..'
                  }
                />
              </View>
            </View>
            <ScrollView
              style={{
                height: 110,
                borderWidth: 1,
                borderColor: color.grey1,
                marginTop: 0,
                paddingHorizontal: 5,
              }}>
              <Text style={styles.textPost}>{postDetails.content}</Text>
            </ScrollView>

            <View style={styles.style1}>
              <View style={styles.style2}>
                <AntDesign name="like2" size={20} />
                <Text>Like {postDetails?.likeBy?.length} </Text>
              </View>
              <View style={styles.style3}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} />
                <Text>Comments {postDetails?.comment?.length}</Text>
              </View>
              <View style={styles.style4}>
                <Ionicons name="chatbubbles-outline" size={20} />
                <Text>Personal chat </Text>
              </View>
            </View>
            <View style={styles.load}>
              <Text style={styles.loadMore}>Comments</Text>
            </View>

            <View style={{height: 320}}>{displayComments()}</View>
          </View>
          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <View style={styles.postComment}>
              <TextInput
                style={styles.input}
                placeholderTextColor={color.grey1}
                placeholder={'Type Your Comment'}
                onChangeText={setContent}
                value={content}
              />
              <TouchableOpacity onPress={addComment}>
                <MaterialCommunityIcons
                  name="send-circle"
                  size={40}
                  color={color.blue2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CardStatusDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: color.blue2,
    height: 55,
  },
  container: {
    padding: 15,
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
  style1: {
    flexDirection: 'row',
    marginTop: 5,
    borderWidth: 1,
    borderColor: color.grey1,
    paddingHorizontal: 5,
    height: 35,
  },
  style2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: color.grey1,
    width: '30%',
    justifyContent: 'center',
  },
  style3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRightWidth: 1,
    borderColor: color.grey1,
    width: '35%',
  },
  style4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: '35%',
  },
  load: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: color.grey2,
  },
  loadMore: {
    color: color.blue2,
    fontSize: 16,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comments: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: color.grey2,
  },
  name1: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  textc: {
    textAlign: 'justify',
    marginLeft: 5
  },
  input: {
    color: 'white',
    color: color.black,
    width: '85%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: color.grey2,
  },
  postComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: color.grey3,
  },
  time: {
    color:color.grey4
  }
});
