import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {color} from '../styles/color';
import CustomPersonalButton from '../components/common/CustomPersonalButton';

import PostCard from '../components/common/PostCard';

function Profile() {
  return (
    <View style={{flex: 1, padding: 12}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.bio}>Bio</Text>
      </View>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        consectetur suspendisse et, libero id magna. Gravida eu auctor aliquet
        posuere accumsan sit et. Orci sodales turpis augue sit eu metus.
      </Text>
      <View style={styles.container1}>
        <Text style={styles.bio}>Interest Topic</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CustomPersonalButton title="Personal" />
        <CustomPersonalButton title="Politics" />
        <CustomPersonalButton title="Sports" />
        <CustomPersonalButton title="Design" />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CustomPersonalButton title="Tech" />
        <CustomPersonalButton title="Culture" />
      </View>
    </View>
  );
}

function PostHistory({navigation}) {
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
}

function Activities() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Activities!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const TabUserProfile = () => {
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
        component={Profile}
        options={{tabBarLabel: 'Profile'}}
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

export default TabUserProfile;

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
});
