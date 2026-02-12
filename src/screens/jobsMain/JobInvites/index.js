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
import {getJobInvites, getJobs} from '../../../redux/job/actions';
import {
  jobInvitesLoadingSelector,
  jobInvitesSelector
} from '../../../redux/job/selectors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import JobItem from '../../../containers/preview/jobItem';

const JobInvites = props => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      {props.jobInvitesLoading ? (
        <ActivityIndicator size={hp('10%')} style={{flex: 1}} />
      ) : props?.jobInvites?.length > 0 ? (
        <FlatList
          style={{padding: 10}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 10}}
          data={props.jobInvites}
          extraData={props.jobInvites}
          renderItem={({item, index}) => (
            <JobItem item={item} index={index} jobInvitesLength={props.jobInvites.length} navigation={props.navigation} />
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: hp('8%'),
            flex: 1,
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
            No Invites found
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
    jobInvites: jobInvitesSelector(state),
    jobInvitesLoading: jobInvitesLoadingSelector(state),
  };
}

export default connect(mapStateToProps)(JobInvites);
