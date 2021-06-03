import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMyActivityAction,
  getStatusDetailsAction,
} from '../redux/action/Action';
import {color} from '../styles/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ActivityCard from '../components/common/ActivityCard';

const Activities = ({navigation}) => {
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.user.myProfile);
  const myActivity = useSelector(state => state.user.myActivity);
  const statusDetails = useSelector(state => state.user.detailsStatus);
  const postCreated = myProfile.created_at;
  const myId = myProfile.id;
  const timeCreated = moment(new Date(postCreated)).fromNow();
  
  useEffect(() => {
    dispatch(getMyActivityAction());
  }, [myActivity]);

  const renderItem = ({item}) => {
    return (
      <ActivityCard
        avatar={item?.status_id?.owner?.avatar}
        name={item?.status_id?.owner?.name}
        content={item?.status_id?.content}
        postCreated={item?.status_id?.created_at}
        media={item?.status_id?.media}
        likeCount={item?.status_id?.likeBy}
        commentCount={item?.status_id?.comment}
        userId={item?.owner?._id}
        type={item?.type}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={myActivity}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  
});
