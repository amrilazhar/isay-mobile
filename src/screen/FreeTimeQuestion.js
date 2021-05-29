import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {color} from '../styles/color';
import axios from 'axios';
import CustomButton from '../components/common/CustomButton';
import CustomCheckbox from '../components/common/CustomCheckbox';

const FreeTimeQuestion = ({route, navigation}) => {
  const {locationSelected} = route.params;

  const [activity, setActivity] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [activitySelected, setActivitySelected] = useState([]);

  // console.log('activityList', activitySelected);

  // useEffect(() => {
  // }, [isRefresh]);
  // console.log(activity);
  // console.log('route', route);

  useEffect(() => {
    axios
      .get('https://isay.gabatch11.my.id/utils/interest/activity')
      .then(response => {
        setActivity(response.data.data);

        // console.log('test activity', response.data.data);
      })
      .catch(error => console.log('error: ', error));
  }, [activitySelected]);

  const interest = id => {
    let selectedActivity = activitySelected;

    if (selectedActivity.length == 0) {
      selectedActivity.push(id);
    } else {
      let idx = selectedActivity.findIndex(activityid => activityid == id);
      if (idx == -1) {
        selectedActivity.push(id);
      } else {
        selectedActivity.splice(idx, 1);
      }
    }
    // console.log('run', selectedActivity);
    setActivitySelected(activitySelected);
    setIsRefresh(!isRefresh);
  };

  const renderItem = ({item}) => {
    // console.log('item', item);

    return (
      <CustomCheckbox
        title={item.interest}
        id={item._id}
        activitySelected={activitySelected}
        onPress={() => interest(item._id)}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View View style={styles.container}>
        <Text style={styles.welcome}>What do you do in your free time?</Text>
        <View style={styles.container1}>
          <Text style={styles.text1}>
            *Min. choose 3 activities. You can choose as much as you want
          </Text>
        </View>

        <FlatList
          data={activity}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />

        <View style={styles.button}>
          <CustomButton
            title="Next"
            onPressButton={() =>
              navigation.navigate('InterestTopic', {
                locationSelected,
                activitySelected,
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FreeTimeQuestion;

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
