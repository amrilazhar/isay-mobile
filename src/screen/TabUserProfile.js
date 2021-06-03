import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {color} from '../styles/color';
import CustomPersonalButton from '../components/common/CustomPersonalButton';
import PostCard from '../components/common/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import ActivityCard from '../components/common/ActivityCard';

const Tab = createMaterialTopTabNavigator();

const TabUserProfile = ({userId, bio}) => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: color.blue2,
        labelStyle: {fontSize: 13, fontWeight: 'bold'},
        style: {backgroundColor: color.grey3},
      }}>
      <Tab.Screen
        name="Profile"
        options={{tabBarLabel: 'Profile'}}
        component={Profile}
      />
      <Tab.Screen
        name="Post"
        component={PostHistory}
        options={{tabBarLabel: 'Post'}}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{tabBarLabel: 'Activities'}}
      />
    </Tab.Navigator>
  );
};

const Profile = () => {
  const anotherProfile = useSelector(state => state.user.anotherProfile);
  const list = anotherProfile.interest

  const renderItem = ({item}) => {   
    return <CustomPersonalButton title={item?.interest}/>;
  };

  return (
    <View style={{flex: 1, padding: 12}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.bio}>Bio</Text>
      </View>
      <Text style={styles.bioContent}>{anotherProfile.bio}</Text>
      <View style={styles.container1}>
        <Text style={styles.bio}>Interest Topic</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          horizontal
        />
      </View>
    </View>
  );
};

const PostHistory = ({navigation}) => {
  const anotherHistoryPost = useSelector(state => state.user.anotherHistoryPost);

  // console.log('hisPostAn', anotherHistoryPost);

  const renderItem = ({item}) => {
    
    return (
      <PostCard
        name={item?.owner?.name}
        status={item?.content}
        navigation={navigation}
        image={item?.owner?.avatar}
        likeCount={item?.likeBy}
        commentCount={item?.comment?.length}
        postCreated={item?.created_at}
        statusId={item?.id}
        userId={item?.owner?.id}
        category={item?.interest[0]?.interest}
        media={item?.media}
      />
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 70}}>
      <FlatList
        data={anotherHistoryPost}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const Activities = () => {

const anotherUserActivity = useSelector(state => state.user.anotherUserActivity);


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
        data={anotherUserActivity}
        renderItem={renderItem}
        keyExtractor={item => `home-post-card-${item._id}`}
      />
    </View>
  );
}

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
});

export default TabUserProfile;
