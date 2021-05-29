import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import {color} from '../styles/color';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import {getLocationAction} from '../redux/action/Action';

const InputLocation = ({navigation}) => {
  const dispatch = useDispatch();
  // const [location, setLocation] = useState([]);
  const [locationSelected, setLocationSelected] = useState('');

  const location = useSelector(state => state.user.location);

  useEffect(() => {
    dispatch(getLocationAction());
  }, []);

  // useEffect(() => {
  //   console.log('marker', location);
  // }, [location]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View View style={styles.container}>
        <Text style={styles.welcome}>Welcome to i-Say</Text>
        <View style={styles.container1}>
          <Image style={styles.logo} source={require('../assets/Logo.png')} />
          <Text style={styles.text1}>
            Everyone deserves to be heard, now it’s your time
          </Text>
          <Text style={styles.text2}> Where is the city you live in? </Text>
          <Text style={styles.text1}> Let them find your great thoughts</Text>
        </View>
        <SafeAreaView style={styles.container2}>
          <Ionicons
            style={styles.ionicons}
            name="location"
            size={25}
            color={color.grey1}
          />
          <Autocomplete
            data={location}
            displayKey={'city'}
            // placeholder={'input location'}
            isMandatory={false}
            maxHeight={300}
            onSelect={value => {
              setLocationSelected(value._id);
            }}
          />
        </SafeAreaView>

        <View style={styles.button}>
          <CustomButton
            title="Next"
            onPressButton={() =>
              navigation.navigate('FreeTimeQuestion', {locationSelected})
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InputLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: 'center',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginTop: 30,
  },

  welcome: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 15,
  },
  text1: {
    fontSize: 21,
    textAlign: 'center',
    color: color.grey4,
  },
  text2: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: color.black,
  },
  logo: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  button: {
    // flex: 1,
    top: 280,
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
});

// axios
//   .get('https://isay.gabatch11.my.id/utils/location')
//   .then(response => {
//     setLocation(response.data.data);
//     // console.log('test city', response.data.data);
//   })
//   .catch(error => console.log('error: ', error));
