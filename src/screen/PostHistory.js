import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/common/PostCard';
import {getHistoryPostAction, getMyProfileAction} from '../redux/action/Action';

const PostHistory = ({navigation}) => {
  const dispatch = useDispatch();
  const historyPost = useSelector(state => state.user.historyPost);
  const myProfile = useSelector(state => state.user.myProfile);
  // console.log('historypost', historyPost);

  useEffect(() => {
    dispatch(getHistoryPostAction());
    dispatch(getMyProfileAction());
  }, []);

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <PostCard
        likeCount={item?.likeBy?.length}
        commentCount={item?.comment.length}
        status={item?.content}
        navigation={navigation}
        statusId={item.id}
        name={myProfile?.name}
        image={myProfile?.avatar}
        postCreated={item?.created_at}
      />
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 70}}>
      <FlatList
        data={historyPost}
        renderItem={renderItem}
        keyExtractor={item => item.id}
       />
    </View>
  );
};

export default PostHistory;

const styles = StyleSheet.create({});
