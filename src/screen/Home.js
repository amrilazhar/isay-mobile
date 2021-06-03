import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import PostCard from '../components/common/PostCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Search from '../components/common/Search';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {
  getStatusByUserInterestAction,
  getStatusDetailsAction,
  getMyProfileAction,
  getInterestAction,
  getPostByInterestAction,
} from '../redux/action/Action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../styles/color';

const Home = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.user.myProfile);
  const post = useSelector(state => state.user.status);
  const [textInput, setTextInput] = useState('');
  const show = [];
  const postByInterest = useSelector(state => state.user.postByInterest);
  const options = useSelector(state => state.user.interest);
  const [interestId, setInterestId] = useState('');

  useEffect(() => {
    dispatch(getInterestAction());
    dispatch(getMyProfileAction());
    dispatch(getPostByInterestAction(interestId));
  }, [interestId, postByInterest]);

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
        interestId={interestId}
      />
    );
  };

  for (let i = 0; i < post.length; i++) {
    const content = post[i].content;
    if (content.toLowerCase().includes(textInput?.toLowerCase())) {
      show.push(post[i]);
    }
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderModal = ({item}) => {
    // console.log('item', item);

    return (
      <TouchableOpacity
        onPress={() => {
          setInterestId(item._id);
          toggleModal();
          
        }}>
        <Text
          style={{
            marginLeft: 17,
            marginVertical: 10,
            borderBottomWidth: 1,
            borderColor: color.grey2,
          }}>
          {item.interest}
        </Text>
      </TouchableOpacity>
    );
  };

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
          onPress={() => toggleModal()}
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

      {/*======SHOW MODAL===== */}
      <Modal
        isVisible={isModalVisible}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
        onBackdropPress={toggleModal}
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        useNativeDriver={true}
        animationInTiming={1000}>
        <View
          style={{
            backgroundColor: color.white,
            borderColor: 'black',

            borderColor: 'white',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              marginVertical: 5,
              fontWeight: 'bold',
            }}>
            What topic would you like to see?
          </Text>
          <FlatList
            data={options}
            renderItem={renderModal}
            keyExtractor={item => item._id}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(getStatusByUserInterestAction());
              toggleModal();
            }}>
            <Text style={{textAlign: 'center', marginVertical: 10}}>
              By My Interst
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* ====MODAL==== */}
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
