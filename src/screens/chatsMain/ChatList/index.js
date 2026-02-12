import * as React from 'react';
import {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {getChatRooms} from '../../../redux/chat/actions';
import {
  chatRoomsLoadingSelector,
  chatRoomsSelector,
} from '../../../redux/chat/selectors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatItem = ({item, index, navigation}) => {
  console.log('item', item);
  return (
    <View
      key={index}
      style={{flex: 1, marginTop: index == 0 ? 5 : 15, marginRight: 10}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatSingle', {chatRoomID: item._id})
        }
        style={[
          {
            flex: 1,
            color: 'rgba(255, 255, 255, 1)',
            alignItems: 'center',
            color: '#353635',
            flexDirection: 'row',
            borderRadius: 8,
            paddingHorizontal: 10,
          },
        ]}>
        {item?.admins?.[0]?.participant?.profilePic ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PublicProfile', {
                userId: participantData._id,
              })
            }
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: 30,
            }}>
            <View style={{}}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  resizeMode: 'cover',
                }}
                source={{
                  uri:
                    (participantData.profilePic.indexOf('public/') >= 0
                      ? SERVER_URL
                      : '') + participantData.profilePic,
                }}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                width: hp('6%'),
                height: hp('6%'),
                borderRadius: hp('3%'),
                backgroundColor: R.colors.PrimaryColorDark,
              },
            ]}>
            <Text
              style={{
                color: R.colors.DarkBlack,
                fontSize: hp('1.8%'),
                fontFamily: R.fonts.defaultRegular,
              }}>
              {item?.admins?.[0]?.participant?.fullName
                ? item?.admins?.[0]?.participant?.fullName != ''
                  ? item?.admins?.[0]?.participant?.fullName
                      .charAt(0)
                      .toUpperCase() +
                    item?.admins?.[0]?.participant?.fullName
                      ?.split(' ')?.[1]
                      ?.charAt(0)
                      .toUpperCase()
                  : null
                : null}
            </Text>
          </TouchableOpacity>
        )}
        <View style={{
                marginLeft: 10, }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              {
                color: R.colors.DarkBlack,
                fontSize: hp('2%'),
                fontFamily: R.fonts.defaultMedium,
              },
            ]}>
            {item?.admins?.[0]?.participant?.fullName}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              {
                color: R.colors.DarkBlack,
                fontSize: hp('1.6%'),
                fontFamily: R.fonts.defaultRegular,
              },
            ]}>
            {item?.lastMessage?.body}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ChatList = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatRooms());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            fontSize: hp('3%'),
            color: R.colors.DarkBlack,
            fontFamily: R.fonts.ArialRoundedBold,
          }}>
          Conversations
        </Text>
      </View>
      {props.chatRoomsLoading ? (
        <ActivityIndicator size={hp('10%')} style={{ flex:1 }} />
      ) : props?.chatRooms?.length > 0 ? (
        <FlatList
          style={{padding: 10}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 10}}
          data={props.chatRooms}
          extraData={props.chatRooms}
          renderItem={({item, index}) => (
            <ChatItem item={item} index={index} navigation={props.navigation} />
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: hp('8%'),
            flex:1,
          }}>
          <Text
            style={[
              {
                color: R.colors.MediumDarkGrey,
                textAlign: 'center',
                fontSize: hp('1.8%'),
                fontFamily: R.fonts.defaultRegular,
              },
            ]}>
            No conversation found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function mapStateToProps(state) {
  return {
    chatRooms: chatRoomsSelector(state),
    chatRoomsLoading: chatRoomsLoadingSelector(state),
  };
}

export default connect(mapStateToProps)(ChatList);
