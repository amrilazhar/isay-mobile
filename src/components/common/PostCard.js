import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import CustomPersonalButton from './CustomPersonalButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {color} from '../../styles/color';

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
}) => {
  const [isLike, setIsLike] = useState(false);

  const timeCreated = moment(new Date(postCreated)).fromNow();

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
            title="Personal"
            onPressButton={() => navigation.navigate('UserProfile', {userId})}
          />
        </View>
      </View>
      <Text style={styles.textPost}>{status}</Text>
      <View style={styles.response}>
        <View style={styles.response1}>
          <AntDesign
            onPress={() => setIsLike(!isLike)}
            color={isLike ? color.blue2 : color.grey4}
            name="like1"
            size={20}
          />
          <Text onPress={() => setIsLike(!isLike)} style={styles.text1}>
            Like {likeCount}{' '}
          </Text>
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
});
