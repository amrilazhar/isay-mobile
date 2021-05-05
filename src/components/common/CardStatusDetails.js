import React from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
//Icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
import CustomPersonalButton from './CustomPersonalButton';
import {color} from '../../styles/color';

const CardStatusDetails = ({name, status}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        <Entypo name="dots-three-horizontal" size={25} color={color.white} />
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
        <View style={styles.load}>
          <Text style={styles.loadMore}>Load more comments</Text>
        </View>
        <View style={styles.comments}>
          <View style={styles.user}>
            <Text style={styles.namec}>Raflesia</Text>
            <Text>3h ago</Text>
          </View>
          <Text style={styles.textc}>
            Let's suppose that we actually want to add another details screen.
            This is pretty common in cases where you
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <View style={styles.postComment}>
          <TextInput
            style={styles.input}
            placeholderTextColor={color.grey1}
            placeholder={'Type Your Comment'}
          />
          <MaterialCommunityIcons
            name="send-circle"
            size={40}
            color={color.blue2}
          />
        </View>
      </View>
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
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comments: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: color.grey2,
  },
  namec: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  textc: {
    textAlign: 'justify',
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
});
