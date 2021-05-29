import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDropdown from 'react-native-modal-dropdown';
import {color} from '../../styles/color';

const PostAboutButton = props => (
  <ModalDropdown
  tit
    style={styles.container}
    dropdownStyle={styles.dropdown}
    dropdownTextStyle={styles.dropdownText}
    options={[
      'Personal',
      'Politics',
      'Sports',
      'Art',
      'Tech',
      'Culture',
      'Music',
      'Business',
    ]}>
    <View style={styles.container1}>
      <Text style={styles.title}>{props.title}</Text>
      <AntDesign name="down" size={18} color={color.blue2} />
    </View>
  </ModalDropdown>
);

const styles = StyleSheet.create({
  container: {
    height: 33,
    backgroundColor: color.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: color.blue2,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: color.blue2,
    marginRight: 5,
  },
  dropdown: {
    height: '30%',
    width: 150,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 7,
    left: 230,
  },
  dropdownText: {
    color: color.blue2,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default PostAboutButton;
