import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {color} from '../../styles/color';

const Person = ({navigation}) => {
  return (
    <View style={{padding: 10, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: color.grey1,
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
              width: '70%',
            }}>
            <Text style={styles.name}>Alfredooo</Text>
            <Text>3h ago</Text>
          </View>
          <View style={{width: '70%'}}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('Chat')}>
              React Native combines the best parts of native development with
              React
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Person;

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
});
