import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/common/PostCard';
import {getHistoryPostAction, getMyProfileAction} from '../redux/action/Action';

const PostHistory = ({navigation}) => {
  const dispatch = useDispatch();
  const historyPost = useSelector(state => state.user.historyPost);
  const myProfile = useSelector(state => state.user.myProfile);
  
  useEffect(() => {
    // console.log('historypost', historyPost);
    dispatch(getHistoryPostAction());
    dispatch(getMyProfileAction());
  },[]);

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <PostCard
        likeCount={item?.likeBy}
        commentCount={item?.comment.length}
        status={item?.content}
        navigation={navigation}
        statusId={item.id}
        name={myProfile?.name}
        image={myProfile?.avatar}
        postCreated={item?.created_at}
        category={item.interest[0].interest}
        userId={item?.owner?.id}
        ownerId={item?.owner?.id}
        media={item?.media}
      />
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 70}}>
      <FlatList
        data={historyPost}
        renderItem={renderItem}
        keyExtractor={item => `home-post-card-${item._id}`}
      />
    </View>
  );
};

export default PostHistory;

const styles = StyleSheet.create({});
