import React from 'react';
import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import {color} from '../../styles/color';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {getChatRoomAct, chatMessageAct} from '../../redux/action/Chat';

const Person = ({navigation, item}) => {
  const dispatch = useDispatch();
  const timeCreated = moment(new Date(item.created_at)).fromNow();
  const receiver =
    item.from._id === item.chatOwner ? item.to._id : item.from._id;

  const displayMessageImageLink = link => {
    return (
      <Text style={{color: 'blue'}} onPress={() => Linking.openURL(link)}>
        {link.substring(0, 20)}
      </Text>
    );
  };

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
              uri:
                item.from._id === item.chatOwner
                  ? item.to.avatar
                  : item.from.avatar,
            }}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              width: '87%'
            }} >
              <Text style={styles.name}>
                {item.from._id === item.chatOwner
                  ? item.to.name
                  : item.from.name}
              </Text>
              <Text style={{color:color.grey4}}>{timeCreated}</Text>
            </View>
          </View>
          <View style={{width: '75%'}}>
            <Text
              style={styles.text}
              onPress={() => {
                navigation.navigate('Chat', {receiver: receiver});
                dispatch(getChatRoomAct(receiver));
                dispatch(chatMessageAct([]));
              }}>
              {item.from._id === item.chatOwner
                ? 'You : '
                : `${item.from.name} : `}
              {item.message_type === 'text'
                ? item.message.substring(0, 20) + '...'
                : displayMessageImageLink(item.message)}
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
