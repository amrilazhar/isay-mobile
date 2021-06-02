import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {color} from '../../styles/color';
import moment from 'moment';
import {chatConstant} from '../../redux/constant/chatTypes';

const MessageBox = ({navigation, item, receiver, socket}) => {
  if (item.to._id != receiver && item.readed === false) {
    item.readed = true;
    socket.emit(chatConstant.SET_READ_STATUS_MESSAGE_EVENT, {
      message_id: item._id,
    });
  }
  const displayMessageImageLink = link => {
    return (
      <View>
        <Image style={styles.messageImage} source={{uri: link}} />
      </View>
    );
  };
  const timeCreated = moment(new Date(item.created_at)).fromNow();

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
            source={{
              uri: item.from?.avatar,
            }}
          />
        </View>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: 22,
              width: '75%',
            }}>
            <Text style={styles.name}>
              {item.to._id.toString() === receiver.toString()
                ? 'You'
                : item.from.name}
            </Text>
            <Text style={{textAlign: 'right'}}>{timeCreated}</Text>
          </View>
          <View style={{width: '75%'}}>
            <Text style={styles.text}>
              {item.message_type === 'text'
                ? item.message
                : displayMessageImageLink(item.message)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  logo: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  messageImage: {
    width: 200,
    height : 200,
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
