import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/common/CustomButton';
import CustomCheckbox from '../components/common/CustomCheckbox';
import {color} from '../styles/color';

const FilterFeed = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.headers}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.filter}>Filter</Text>
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.cross}>
          <AntDesign name="close" size={25} color={color.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.text1}>What topic would you like to see?</Text>
        <Text style={styles.text2}>
          You can only choose one. Go to Interest on your profile to add new
          interest
        </Text>
      </View>
      <View style={styles.interest}>
        <CustomCheckbox title="All my interest" />
        <CustomCheckbox title="Social" />
        <CustomCheckbox title="Bussiness" />
        <CustomCheckbox title="Politics" />
        <CustomCheckbox title="Art" />
      </View>
      <View style={styles.interest1}>
        <Text style={styles.text3}>Whose post would you like to see?</Text>
        <CustomCheckbox title="Only people from my city" />
      </View>

      <View style={styles.button}>
        <CustomButton title="Update" />
      </View>
    </View>
  );
};

export default FilterFeed;

const styles = StyleSheet.create({
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.blue2,
    height: 50,
  },
  filter: {
    color: color.white,
    fontSize: 18,
    marginLeft: 15,
  },
  cross: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  content: {
    padding: 15,
  },
  text1: {
    fontSize: 16,
    color: color.black,
  },
  text2: {
    fontSize: 14,
    marginTop: 10,
    color: color.grey4,
  },
  text3: {
    fontSize: 16,
    color: color.black,
    marginBottom: 25,
  },
  interest: {
    borderBottomWidth: 1,
    borderColor: color.grey2,
    marginHorizontal: 15,
  },
  interest1: {
    marginTop: 25,
    marginHorizontal: 15,
  },
  button: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'flex-end',
  },
});
