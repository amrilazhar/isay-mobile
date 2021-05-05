import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import CustomPersonalButton from './CustomPersonalButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {color} from '../../styles/color';

const PostCard = ({name, status}) => {
  // console.log('ini jalan', name);
  return (
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
              source={require('../../assets/Avatar1.png')}
            />
          </View>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text>3h ago</Text>
          </View>
        </View>
        <View>
          <CustomPersonalButton title="Personal" />
        </View>
      </View>
      <Text style={styles.textPost}>{status}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
          borderWidth: 1,
          borderColor: color.grey1,
          paddingHorizontal: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRightWidth: 1,
            borderColor: color.grey1,
            height: 35,
          }}>
          <AntDesign name="like2" size={20} />
          <Text>Like (3) </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRightWidth: 1,
            borderColor: color.grey1,
          }}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} />
          <Text>Comments (13) </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="chatbubbles-outline" size={20} />
          <Text>Personal chat (3) </Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    width: 65,
    height: 65,
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
});
