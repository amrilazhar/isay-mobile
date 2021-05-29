import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import PostCard from '../components/common/PostCard';

const PostHistory = ({navigation}) => {
  const [post, setPost] = useState([
    {
      id: 1,
      name: 'Anpanman',
      status:
        'React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.',
    },
    {
      id: 2,
      name: 'Anpanman',
      status:
        'Many platforms, one React. Create platform-specific versions of components so a single codebase can share code across platforms. With React Native, one team can maintain two platforms and share a common technology—React.',
    },
    {
      id: 3,
      name: 'Anpanman',
      status:
        'Many platforms, one React. Create platform-specific versions of components so a single codebase can share code across platforms. With React Native, one team can maintain two platforms and share a common technology—React.',
    },
  ]);

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <PostCard name={item.name} status={item.status} navigation={navigation} />
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 70}}>
      <FlatList
        data={post}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PostHistory;

const styles = StyleSheet.create({});
