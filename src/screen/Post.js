import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {color} from '../styles/color';
import PostAboutButton from '../components/common/PostAboutButton';
import {TextInput} from 'react-native-gesture-handler';

const Post = () => {


  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        <Text style={styles.textHeader}>Post</Text>
        <Entypo name="dots-three-horizontal" size={25} color={color.white} />
      </View>
      <View style={{padding: 10}}>
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
                source={require('../assets/Avatar.png')}
              />
            </View>
            <View>
              <Text style={styles.name}>Anpanman</Text>
              <Text>3h ago</Text>
            </View>
          </View>
          <View>
            {/* <PostAboutButton title="Personal" /> */}
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder={'What would you like to say today?'}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.container2}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <View style={styles.buttonContainer1}>
              <Feather name="image" size={18} color={color.black} />
              <Text style={styles.buttonTitle}>Image</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.post}>
            <Text style={{color: color.white}}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: color.blue2,
    height: 55,
  },
  textHeader: {
    color: color.white,
    fontSize: 18,
  },
  logo: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  textInput: {
    marginTop: 20,
  },
  buttonContainer: {
    height: 33,
    backgroundColor: color.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: color.grey1,
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonTitle: {
    fontSize: 14,
    color: color.black,
    marginLeft: 5,
  },
  container2: {
    marginBottom: 60,
    padding: 10,
    backgroundColor: color.grey3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  post: {
    height: 33,
    backgroundColor: color.blue1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: color.grey1,
  },
});
