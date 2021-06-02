import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, Image} from 'react-native';
import PostCard from '../components/common/PostCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Search from '../components/common/Search';
import {useDispatch, useSelector} from 'react-redux';
import {
  getStatusByUserInterestAction,
  getStatusDetailsAction,
  getMyProfileAction,
} from '../redux/action/Action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../styles/color';


const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.user.myProfile);
  const post = useSelector(state => state.user.status);
  const [textInput, setTextInput] = useState('');
  const show= [];
  
  
  useEffect(() => {
    console.log('post', post);
    dispatch(getStatusByUserInterestAction());
    dispatch(getMyProfileAction())
  }, []);
  

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
        ownerId={item?.owner._id}
        userId={item?.owner?.id}
        category={item.interest[0].interest}
        media={item.media}
      />
    );
  };

  for (let i = 0; i < post.length; i++) {
    const content = post[i].content;
    if (content.toLowerCase().includes(textInput?.toLowerCase())) {
      show.push(post[i]);
    }
  }


  return (
    <View style={{marginBottom: 130}}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${myProfile.avatar}`,
          }}
        />
        <View style={styles.container1}>
          <Ionicons style={styles.ionicons} name="search" size={25} />
          <TextInput
            style={styles.input}
            placeholderTextColor={color.grey1}
            placeholder={'Search annonymous'}
            value={textInput}
            onChangeText={setTextInput}
          />
        </View>
        <MaterialIcons
          onPress={() => navigation.navigate('FilterFeed')}
          name="filter-tilt-shift"
          size={30}
          color={color.white}
        />
      </View>

      <FlatList
        data={show}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: color.blue2,
    height: 70,
  },
  container1: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: color.grey2,
    borderRadius: 5,
    backgroundColor: color.white,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  input: {
    color: 'white',
    color: color.black,
    paddingLeft: 10,
    width: '72%',
  },
  ionicons: {
    color: color.grey1,
  },
  tinyLogo: {
    height: 40,
    width: 40,
  },
});

// 1 state penampung text input
// 