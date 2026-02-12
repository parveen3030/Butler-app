// import AsyncStorage from "@react-native-async-storage/async-storage";
// import messaging from "@react-native-firebase/messaging";
// let token = null;

// export async function requestUserPermission() {
// 	const authStatus = await messaging().requestPermission();

// 	const enabled =
// 		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// 		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// 	if (enabled) {
// 		getFcmToken();
// 	}
// }

// const getFcmToken = async () => {
// 	let fcmToken = await AsyncStorage.getItem("fcmToken");
// 	console.log("fcm token==>", fcmToken);
// 	if (!fcmToken) {
// 		try {
// 			const fcmToken = await messaging().getToken();
// 			token = fcmToken;
// 			if (fcmToken) {
// 				console.log("new generated==>", fcmToken);
// 				await AsyncStorage.setItem("fcmToken", fcmToken);
// 			}
// 		} catch (e) {
// 			console.log("error==>", e);
// 		}
// 	} else {
// 		token = fcmToken;
// 	}
// };
// export { token };

// export const notificationListner = async () => {
// 	messaging().setBackgroundMessageHandler(async (remoteMessage) => {
// 		console.log("Message handled in the background neww alert!", remoteMessage);
// 	});

// 	messaging().onMessage(async (remoteMessage) => {
// 		console.log("received in foreground==>", remoteMessage.notification);

// 		// PushNotification.localNotification({
// 		//   channelId: 'fcm_fallback_notification_channel',
// 		//   title: remoteMessage.notification.title,
// 		//   message: remoteMessage.notification.body,
// 		// })
// 	});
// };
