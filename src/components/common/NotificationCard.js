import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {color} from '../../styles/color';
import CustomPersonalButton from './CustomPersonalButton';
import moment from 'moment';

const NotificationCard = ({navigation, dataNotif, socket}) => {
  const timeCreated = moment(new Date(dataNotif.created_at)).fromNow();

  if (socket !== undefined && dataNotif.readed === false) {
    dataNotif.readed = true;
    socket.emit('readNotif', {
      notif_id: dataNotif._id,
    });
  }

  const otherDoing = () => {
    switch (dataNotif.type) {
      case 'like_status':
        return (
          <View style={{width: '95%'}}>
            <Text style={styles.text}>Like Your Post</Text>
          </View>
        );
      case 'post_comment':
        return (
          <View style={{width: '95%'}}>
            <Text style={styles.text}>Commented</Text>
            <Text>{dataNotif.comment_id?.content}</Text>
          </View>
        );
      default:
        return (
          <View style={{width: '95%'}}>
            <Text style={styles.text}>....</Text>
            <Text>....</Text>
          </View>
        );
    }
  };

  const statusRelated = () => {
    if (dataNotif.status_id) {
      const statusTimeCreated = moment(
        new Date(dataNotif.status_id.created_at),
      ).fromNow();
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StatusDetails', {statusId: dataNotif._id});
          }}>
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
                    source={{uri: dataNotif.to.avatar}}
                  />
                </View>
                <View>
                  <Text style={styles.name}>{dataNotif.to.name}</Text>
                  <Text>{statusTimeCreated}</Text>
                </View>
              </View>
              <View>
                <CustomPersonalButton
                  title={dataNotif.status_id.interest[0].interest}
                />
              </View>
            </View>
            <Text style={styles.textPost}>{dataNotif.status_id.content}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <View>
          <Image style={styles.logo} source={{uri: dataNotif.from.avatar}} />
        </View>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: 22,
              width: 300,
            }}>
            <Text style={styles.name}>{dataNotif.from.name}</Text>
            <Text>{timeCreated}</Text>
          </View>
          {otherDoing()}
        </View>
      </View>

      {/* Marker commented */}
      {statusRelated()}
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
