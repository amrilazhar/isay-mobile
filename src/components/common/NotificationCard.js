import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {color} from '../../styles/color';
import CustomPersonalButton from './CustomPersonalButton';

const NotificationCard = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <View>
          <Image
            style={styles.logo}
            source={require('../../assets/Avatar1.png')}
          />
        </View>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: 22,
              width: 300,
            }}>
            <Text style={styles.name}>Rfalesia Arnold</Text>
            <Text>3h ago</Text>
          </View>
          <View style={{width: '95%'}}>
            <Text style={styles.text}>Commented</Text>
            <Text>“lorem ipsum dolor sit amet Lorem ipsum...”</Text>
          </View>
        </View>
      </View>

      {/* Marker commented */}
      <View
        style={{
          borderWidth: 1,
          borderColor: color.grey1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}>
        <View style={styles.container1}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                style={styles.logo}
                source={require('../../assets/Avatar.png')}
              />
            </View>
            <View>
              <Text style={styles.name}>Anpanman</Text>
              <Text>3h ago</Text>
            </View>
          </View>
          <View>
            <CustomPersonalButton title="Personal" />
          </View>
        </View>
        <Text style={styles.textPost}>
          this is your status for testing visualitation Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Eu vitae turpis erat et faucibus
          elit......
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: color.grey1,
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
  text: {
    textAlign: 'justify',
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  container1: {
    // marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  textPost: {
    marginLeft: 10,
  },
});
