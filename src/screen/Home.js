import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import PostCard from '../components/common/PostCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Search from '../components/common/Search';
import {useDispatch, useSelector} from 'react-redux';
import {
  getStatusByUserInterestAction,
  getStatusDetailsAction,
} from '../redux/action/Action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const post = useSelector(state => state.user.status);
  // console.log('post', post);

  useEffect(() => {
    dispatch(getStatusByUserInterestAction());
  }, []);

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <PostCard
        name={item?.owner?.name}
        status={item?.content}
        navigation={navigation}
        image={item?.owner?.avatar}
        likeCount={item?.likeBy?.length}
        commentCount={item?.comment?.length}
        postCreated={item?.created_at}
        statusId={item?.id}
      />
    );
  };

  return (
    <View style={{marginBottom: 130}}>
      <Search navigation={navigation} />
      <FlatList
        data={post}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
