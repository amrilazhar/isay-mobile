import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import CustomButton from '../components/common/CustomButton';
import {color} from '../styles/color';

const ConfirmAvatar = ({route, navigation}) => {
  const {profile} = route.params;

  console.log('profile', profile);

  const renderInterest = ({item}) => {
    // console.log('item', item);
    return (
      <View>
        <Image
          style={styles.avatar1}
          source={{
            uri: `${item.icon}`,
          }}
        />

        <Text style={styles.textAvatar}>{item.interest}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Cool! We identified you as...</Text>
        <View style={styles.container1}>
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Image
              style={styles.avatar}
              source={{
                uri: `${profile.avatar}`,
              }}
            />
          </View>
          <Text style={styles.text1}>{profile.name}</Text>
          <Text style={styles.text2}>You are interested in</Text>
          <Text style={styles.text3}>You can change this later</Text>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.interestList}>
            <FlatList
              data={profile.interest}
              renderItem={renderInterest}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.textAvatar}>Fun fact</Text>
          <Text style={styles.text4}>{profile.funfact.content}</Text>
        </View>
        <View style={styles.button}>
          <CustomButton
            title="Start"
            onPressButton={() => navigation.navigate('MainTab')}
          />
        </View>
      </View>
    </View>
  );
};

export default ConfirmAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: 'center',
  },
  avatarContainer: {
    // backgroundColor: color.black,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
  },
  textbottom: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 70,
    marginBottom: 20,
  },
  text1: {
    fontSize: 22,
    textAlign: 'center',
    color: color.black,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  textAvatar: {
    textAlign: 'center',
    color: color.black,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  text2: {
    fontSize: 20,
    textAlign: 'center',
    color: color.black,
    marginTop: 25,
  },
  text3: {
    fontSize: 15,
    textAlign: 'center',
    color: color.black,
    marginTop: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatar1: {
    // marginTop: 25,
    marginHorizontal: 8,
    width: 70,
    height: 70,
  },
  text4: {
    fontSize: 15,
    textAlign: 'justify',
    color: color.black,
    marginTop: 12,
    width: 300,
  },
  interestList: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: color.white,
    overflow: 'hidden',
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    // borderWidth: 1,
  },
  content: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: color.grey1,
  },
  button: {
    // flex: 1,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
});
