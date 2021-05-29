import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import {color} from '../styles/color';
import CustomButton from '../components/common/CustomButton';
import CustomCheckbox from '../components/common/CustomCheckbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InterestTopic = ({route, navigation}) => {
  const [isRefresh, setIsRefresh] = useState(false);

  const {activitySelected, locationSelected} = route.params;

  const [interestSelected, setInterestSelected] = useState([]);

  const [interest, setInterest] = useState([]);

  // console.log('profile created', profile);

  useEffect(() => {
    axios
      .get('https://isay.gabatch11.my.id/utils/interest/topic')
      .then(response => {
        setInterest(response.data.data);
        // console.log('test activity', response.data.data);
      })
      .catch(error => console.log('error: ', error));
  }, [interestSelected]);

  // const token = AsyncStorage.getItem('accessToken');
  // token.then(response => {
  //   console.log('ini token', response);
  // });

  const selectInterest = id => {
    let selectedInterest = interestSelected;

    if (selectedInterest.length == 0) {
      selectedInterest.push(id);
    } else {
      let idx = selectedInterest.findIndex(activityid => activityid == id);
      if (idx == -1) {
        selectedInterest.push(id);
      } else {
        selectedInterest.splice(idx, 1);
      }
    }
    // console.log('run', selectedActivity);
    setInterestSelected(interestSelected);
    setIsRefresh(!isRefresh);
  };
  const renderItem = ({item}) => {
    // console.log('item', item);

    return (
      <CustomCheckbox
        title={item.interest}
        id={item._id}
        // interestSelected={InterestSelected}
        onPress={() => selectInterest(item._id)}
      />
    );
  };

  const createProfile = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const AuthStr = 'Bearer '.concat(token);

    // console.log('interestLits', interestSelected);
    // console.log('location', locationSelected);
    // console.log('activity', activitySelected);

    axios({
      method: 'POST',
      url: 'https://isay.gabatch11.my.id/user/first_profile',
      headers: {Authorization: AuthStr, 'Content-Type': 'application/json'},
      data: JSON.stringify({
        interest: JSON.stringify(interestSelected),
        location: locationSelected,
        activity: JSON.stringify(activitySelected),
      }),
    })
      .then(async response => {
        navigation.navigate('ConfirmAvatar', {profile: response.data.data});
      })
      .catch(error => console.log('Error', error));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View View style={styles.container}>
        <Text style={styles.welcome}>Which Topic do you like?</Text>
        <View style={styles.container1}>
          <Text style={styles.text1}>
            *Choose Topic. You can choose as much as you want
          </Text>
        </View>

        <FlatList
          data={interest}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
      <View style={styles.button}>
        <CustomButton title="Next" onPressButton={createProfile} />
      </View>
    </SafeAreaView>
  );
};

export default InterestTopic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  text1: {
    fontSize: 13,
    width: '70%',
    textAlign: 'center',
    color: color.black,
    marginVertical: 5,
  },
  button: {
    flex: 0.1,
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
});
