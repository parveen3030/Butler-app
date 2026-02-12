import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Linking,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
} from "react-native";
import {
  Bubble,
  Day,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import { connect, useDispatch } from "react-redux";
import io from "socket.io-client";
import {
  tokenSelector,
  userDataSelector,
} from "../../../redux/auth/selectors";
import {SOCKET_API_ENDPOINT } from "../../../config";
import R from "../../../assets";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IconF from "react-native-vector-icons/FontAwesome5";
import IconB from "react-native-vector-icons/MaterialCommunityIcons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import IconFS from "react-native-vector-icons/FontAwesome";
import { useRef } from "react";
import {
  endChatAPI,
  getChatroomMessages,
  getInvoiceDetail,
} from "../../../network/chatApi";
import moment from "moment";
import { getChatRooms } from "../../../redux/chat/actions";
import DocumentPickerRN from "react-native-document-picker";
import { uploadAttachment } from "../../../network/userApi"
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncodingOption,
  AVEncoderAudioQualityIOSType,
  OutputFormatAndroidType,
  AVModeIOSOption,
} from "react-native-audio-recorder-player";
import Lightbox from "react-native-lightbox-v2";
import Pdf from "react-native-pdf";
import DocumentIcon from "../../../assets/images/document_icon.svg";
import ActionSheet from "react-native-actions-sheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import RNFS from "react-native-fs";
import Icons from "../../../containers/common/Icons";
import { Header } from "../../../containers/common/header";
import { setAppLoading } from "../../../redux/app/actions";
import { getSupportChats } from "../../../redux/chat/actions";

const audioRecorderPlayer = new AudioRecorderPlayer();

var socket = "";
const ChatSingle = (props) => {
  const dispatch = useDispatch();
  const actionSheetRef = useRef(null);
  const { chatRoomID, endChat, roomType } = props.route.params;
  const { token, userData } = props;
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [messages, setMessages] = React.useState([]);
  const [documents, setDocuments] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recordingPaused, setRecordingPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [loadingFile, setLoadingFile] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState({
    duration: "00:00:00",
    msgId: "",
    status: false,
  });
  const path = Platform.select({
    ios: `_${Math.floor(Math.random() * 10000000)}.m4a`,
    android: `${RNFS.DocumentDirectoryPath}/_${Math.floor(
      Math.random() * 10000000
    )}.m4a`,
  });

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const renderActionSheet = () => {
    return (
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 0,
        }}
        gestureEnabled={true}
      >
        <View
          style={{
            paddingBottom: hp("5%"),
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: R.colors.BorderLightGrey,
            }}
          >
            <TouchableOpacity
              onPress={openCameraGalleryPicker}
              style={{
                padding: 15,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: "10%", alignItems: "center" }}>
                <IconF name={"image"} color={"#537dd8"} size={hp("2.6%")} />
              </View>
              <Text
                style={{
                  color: R.colors.DarkGrey,
                  fontFamily: R.fonts.defaultMedium,
                  fontSize: hp("2%"),
                  marginLeft: 10,
                }}
              >
                Choose From Library
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={openDocumentPicker}
              style={{
                padding: 15,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: "10%", alignItems: "center" }}>
                <IconF name={"file"} color={"#537dd8"} size={hp("2.6%")} />
              </View>
              <Text
                style={{
                  color: R.colors.DarkGrey,
                  fontFamily: R.fonts.defaultMedium,
                  fontSize: hp("2%"),
                  marginLeft: 10,
                }}
              >
                Select Document
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
    );
  };

  const renderMessageAudio = (props) => {
    return (
      <View
        style={{
          width: hp("15%"),
          height: hp("5%"),
          borderRadius: hp("2.5%"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          backgroundColor: R.colors.PrimaryColorDark,
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            if (
              !audioPlaying.status ||
              audioPlaying.msgId != props.currentMessage._id
            ) {
              audioRecorderPlayer.stopPlayer();
              audioRecorderPlayer.removePlayBackListener();

              setAudioPlaying({
                status: true,
                msgId: props.currentMessage._id,
                duration: "00:00:00",
              });
              const msg = await audioRecorderPlayer.startPlayer(
                props.currentMessage.audio
              );
              const volume = await audioRecorderPlayer.setVolume(1.0);
              audioRecorderPlayer.addPlayBackListener((e) => {
                if (e.currentPosition == e.duration) {
                  setAudioPlaying({
                    status: false,
                    msgId: null,
                    duration: "00:00:00",
                  });
                  audioRecorderPlayer.stopPlayer();
                  audioRecorderPlayer.removePlayBackListener();
                } else {
                  setAudioPlaying({
                    status: true,
                    msgId: props.currentMessage._id,
                    duration: audioRecorderPlayer.mmssss(
                      Math.floor(e.currentPosition)
                    ),
                  });
                }
              });
            } else {
              setAudioPlaying({
                status: false,
                msgId: null,
                duration: "00:00:00",
              });
              audioRecorderPlayer.stopPlayer();
              audioRecorderPlayer.removePlayBackListener();
            }
          }}
          style={{}}
        >
          <IconFS
            name={
              audioPlaying.msgId == props.currentMessage._id ? "stop" : "play"
            }
            color={R.colors.White}
            size={hp("2.6%")}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: R.colors.White,
            fontSize: hp("1.4%"),
            marginLeft: 10,
            fontFamily: R.fonts.defaultRegular,
          }}
        >
          {audioPlaying?.status &&
          audioPlaying?.msgId == props.currentMessage._id
            ? audioPlaying.duration
            : props.currentMessage.attachmentSize}
        </Text>
      </View>
    );
  };

  const renderMessageVideo = (props) => {
    return (
      props.currentMessage.attachment?.file?.includes("pdf") && (
        <Lightbox
          swipeToDismiss={false}
          style={{
            margin: 10,
          }}
          onOpen={() => setLoadingFile(true)}
          onLayout={() => setLoadingFile(false)}
          underlayColor={"transparent"}
          activeProps={{
            style: {
              width: "100%",
              height: "100%",
            },
          }}
          renderContent={() => (
            <Pdf
              trustAllCerts={false}
              source={{ uri: props.currentMessage.attachment?.file }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              renderActivityIndicator={() => (
                <ActivityIndicator size={hp("10%")} color={"#fff"} />
              )}
              style={styles.pdf}
            />
          )}
        >
          <View
            style={{
              backgroundColor: "#FFF1DC",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              padding: 15,
              paddingHorizontal: 20,
            }}
          >
            <DocumentIcon width={hp("6%")} />
          </View>
        </Lightbox>
      )
    );
  };

  const openCameraGalleryPicker = async (galleryPicker = true) => {
    let result = null;
    const options = {
      mediaType: "photo",
    };
    if (galleryPicker) {
      result = await launchImageLibrary(options);
    } else {
      result = await launchCamera(options);
    }
    console.log("result", result);
    actionSheetRef.current?.hide();
    if (!result?.didCancel) {
      uploadAttachment(result?.assets?.[0]).then((data) => {
        if (data?.data?.path) {
          let type = "";
          if (result?.assets?.[0].type.includes("image/")) {
            type = "image";
          }
          onSend([{ attachment: { url: data?.data?.path, type: type } }], true);
        }
      });
    }
  };

  const openDocumentPicker = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: "App needs access to memory to upload the file ",
      }
    );

    console.log(granted);
    if (granted != PermissionsAndroid.RESULTS.GRANTED) {
      ToastAndroid.showWithGravity(
        "You need to give storage permission to upload the file",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return false;
    }
    DocumentPickerRN.pick({
      allowMultiSelection: false,
      type: [
        DocumentPickerRN.types.plainText,
        DocumentPickerRN.types.pdf,
        DocumentPickerRN.types.images,
      ],
    }).then(async (res) => {
      actionSheetRef.current?.hide();
      console.log("res", res);

      uploadAttachment(res?.[0]).then((data) => {
        if (data?.data?.path) {
          let type = "";
          if (res?.[0].type.includes("image/")) {
            type = "image";
          } else if (res?.[0].type.includes("application/pdf")) {
            type = "file";
          } else if (res?.[0].type.includes("text/")) {
            type = "text";
          }
          onSend([{ attachment: { url: data?.data?.path, type: type } }], true);
        }
      });
    });
  };

  const getMessages = () => {
    setLoader(true);
    getChatroomMessages(chatRoomID, pageNumber + 1)
      .then((data) => {
        console.log("getChatroomMessages======aaall", data.messages);
        if (data?.messages?.length > 0) {
          var arr = [];
          var count = 0;
          var lastMessageId = "";
          if (data?.totalCount?.[0]?.count - (pageNumber + 1) * 10 > 0) {
            setLoadEarlier(true);
          } else {
            setLoadEarlier(false);
          }

          setPageNumber((previousState) => previousState + 1);
          data.messages.forEach((doc) => {
            if (doc.sender) {
              if (doc.attachment?.t === "image") {
                arr.push({
                  _id: doc._id,
                  image: doc.attachment?.image,
                  date: moment(doc.sentAt).valueOf(),
                  createdAt: doc.sentAt,
                  user: {
                    _id: doc.sender,
                    avatar: null,
                  },
                });
              } else if (doc.attachment?.t === "audio") {
                arr.push({
                  _id: doc._id,
                  audio: doc.attachment?.audio,
                  attachmentSize: doc.attachment?.size,
                  date: moment(doc.sentAt).valueOf(),
                  createdAt: doc.sentAt,
                  user: {
                    _id: doc.sender,
                    avatar: null,
                  },
                });
              } else if (doc.attachment?.t) {
                arr.push({
                  _id: doc._id,
                  video: "attachment",
                  attachment: doc.attachment,
                  date: moment(doc.sentAt).valueOf(),
                  createdAt: doc.sentAt,
                  user: {
                    _id: doc.sender,
                    avatar: null,
                  },
                });
              } else {
                arr.push({
                  _id: doc._id,
                  text: doc.body,
                  date: moment(doc.sentAt).valueOf(),
                  createdAt: doc.sentAt,
                  user: {
                    _id: doc.sender,
                    avatar: null,
                  },
                });
              }
            } else {
              arr.push({
                _id: doc._id,
                text: doc.body,
                date: moment(doc.sentAt).valueOf(),
                createdAt: doc.sentAt,
                isSystem: true,
                foo: true,
                system: true,
              });
            }
          });
          arr = arr.sort((a, b) => b.date - a.date);
          setMessages((previousMessages) =>
            GiftedChat.append(arr, previousMessages)
          );
        }

        setLoader(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getMessages();
    console.log("chatRoomId", chatRoomID, props.route.params);
    console.log("API_ENDPOINT", SOCKET_API_ENDPOINT);
    socket = io.connect(SOCKET_API_ENDPOINT, { path: "/api/socket.io" });
    console.log("socket initialized=====", socket);
    socket.emit("connectToChats", { token: token });
    socket.emit("getChatMessages=====", {
      token: token,
      chatRoomId: chatRoomID,
    });
    enableSocketEvents();
    return () => {
      socket.disconnect();
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, []);

  const onStartRecord = async () => {
    await audioRecorderPlayer.removeRecordBackListener();
    await audioRecorderPlayer.stopRecorder();
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const result = await audioRecorderPlayer.startRecorder(null, audioSet);
    let start = false;
    setRecordingTime("00:00");
    setRecording(true);

    audioRecorderPlayer.addRecordBackListener((e) => {
      start = true;
      setRecordingTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
      );
    });
  };

  const getFileNameFromLink = (link) => {
    let fileName = link.split("/").pop();
    return fileName;
  };

  const getFileExtensionFromLink = (link) => {
    var fileName = link.split("/").pop();
    var fileExtension = fileName.split(".").pop();
    return fileExtension;
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    console.log("audio==========", getFileExtensionFromLink(result));
    setRecording(false);
    setRecordingPaused(false);
    audioRecorderPlayer.removeRecordBackListener();
    setRecordingTime("00:00");

    uploadAttachment({ uri: result }, ".aac").then((data) => {
      console.log("dkdk======", data);
      if (data?.data?.path) {
        onSend(
          [
            {
              attachment: {
                url: data?.data?.path,
                type: "audio",
                size: recordingTime,
              },
            },
          ],
          true
        );
      }
    });
  };

  const discardRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setRecording(false);
    setRecordingPaused(false);
    setRecordingTime("00:00");
  };

  const pauseRecording = async () => {
    const result = await audioRecorderPlayer.pauseRecorder();
    setRecordingPaused(true);
  };

  const resumeRecording = async () => {
    const result = await audioRecorderPlayer.resumeRecorder();
    setRecordingPaused(false);
  };

  const renderRecordingView = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "#fff",
          backgroundColor: "#fff",
          borderTopColor: R.colors.BorderChatBox,
          borderTopWidth: 1,
          padding: 10,
          paddingBottom: 20,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: R.colors.DarkGrey,
              fontSize: hp("2%"),
              fontFamily: R.fonts.defaultMedium,
            }}
          >
            {recordingTime?.substr(0, 5)}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TouchableOpacity
            style={{
              width: hp("5%"),
              height: hp("5%"),
              borderRadius: hp("2.5%"),
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={discardRecording}
          >
            <IconFS name={"trash"} color={R.colors.Grey} size={hp("4%")} />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={recordingPaused ? resumeRecording : pauseRecording}
              style={{
                width: hp("5%"),
                height: hp("5%"),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icons
                family={"Feather"}
                name={recordingPaused ? "play-circle" : "pause-circle"}
                color={R.colors.Red}
                size={hp("4.5%")}
              />
              {/* <IconM
                name={
                  recordingPaused
                    ? "motion-play-outline"
                    : "motion-pause-outline"
                }s
                color={R.colors.Red}
                size={hp("4.5%")}
              /> */}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={onStopRecord}
            style={{
              width: hp("5%"),
              height: hp("5%"),
              borderRadius: hp("2.5%"),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: R.colors.PrimaryColorDark,
            }}
          >
            <IconFS
              name={"paper-plane"}
              color={R.colors.White}
              size={hp("2.6%")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <View
        style={{
          height: hp("11%"),
          position: "relative",
        }}
      >
        {recording ? (
          renderRecordingView()
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderTopColor: R.colors.BorderChatBox,
              borderTopWidth: 1,
              padding: 10,
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity onPress={openActionSheet}>
              <IconM
                name={"plus"}
                color={R.colors.PrimaryColorDark}
                size={hp("4%")}
              />
            </TouchableOpacity>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  color: "rgba(255, 255, 255, 1)",
                  borderColor: R.colors.BorderChatBox,
                  borderWidth: 1,
                  color: "#353635",
                  borderRadius: 12,
                  paddingHorizontal: 15,
                  flex: 1,
                  marginHorizontal: 10,
                  backgroundColor: R.colors.BackgroundLightGrey,
                },
              ]}
            >
              <TextInput
                placeholder={props.placeholder ? props.placeholder : ""}
                placeholderTextColor={R.colors.LightGrey}
                style={{
                  color: R.colors.DarkGrey,
                  height: 50,
                  marginLeft: 0,
                  flex: 1,
                  fontSize: hp("1.8%"),
                  backgroundColor: "transparent",
                  fontFamily: R.fonts.defaultMedium,
                }}
                onChangeText={(text) => {
                  setMessage(text);
                }}
                value={message}
              />
              <TouchableOpacity
                onPress={recording ? onStopRecord : onStartRecord}
              >
                <IconM
                  name={recording ? "stop" : "microphone-outline"}
                  color={recording ? R.colors.Red : R.colors.LightGrey}
                  size={hp("3.6%")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => onSend([{ text: message }])}
              style={{
                width: hp("5%"),
                height: hp("5%"),
                borderRadius: hp("2.5%"),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: R.colors.PrimaryColorDark,
                paddingLeft: hp("0.8%"),
              }}
            >
              <Icons
                family={"FontAwesome"}
                name="chevron-right"
                color={R.colors.White}
                size={hp("3%")}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const onSend = (messages = [], isAttachment = false) => {
    if (chatRoomID != "") {
      if (isAttachment) {
        var attachment = messages[0]?.attachment;
        socket.emit("sendMessage", {
          token: token,
          chatRoomId: chatRoomID,
          isUrl: true,
          url: attachment?.url,
          msgType: attachment?.type,
          attachmentSize: attachment?.size,
        });
      } else {
        var messageText = messages[0].text;

        if (messageText != "") {
          socket.emit("sendMessage", {
            token: token,
            chatRoomId: chatRoomID,
            message: messageText,
          });

          setMessage("");
        }
      }
    }
  };

  const enableSocketEvents = () => {
    socket.on("messageData", (data) => {
      if (data?.messages?.length > 0) {
        dispatch(getChatRooms());
        var arr = [];
        console.log("Data:1", userData);

        data.messages.forEach((doc) => {
          if (doc.attachment?.t === "image") {
            arr.push({
              _id: doc._id,
              image: doc.attachment?.image,
              date: moment(doc.sentAt).valueOf(),
              createdAt: doc.sentAt,
              user: {
                _id: doc.sender,
                avatar: null,
              },
            });
          } else if (doc.attachment?.t === "audio") {
            arr.push({
              _id: doc._id,
              audio: doc.attachment?.audio,
              attachmentSize: doc.attachment?.size,
              date: moment(doc.sentAt).valueOf(),
              createdAt: doc.sentAt,
              user: {
                _id: doc.sender,
                avatar: null,
              },
            });
          } else if (doc.attachment?.t) {
            arr.push({
              _id: doc._id,
              video: "attachment",
              attachment: doc.attachment,
              date: moment(doc.sentAt).valueOf(),
              createdAt: doc.sentAt,
              user: {
                _id: doc.sender,
                avatar: null,
              },
            });
          } else {
            arr.push({
              _id: doc._id,
              text: doc.body,
              date: moment(doc.sentAt).valueOf(),
              createdAt: doc.sentAt,
              user: {
                _id: doc.sender,
                avatar: null,
              },
            });
          }
        });
        arr = arr.sort((a, b) => b.date - a.date);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, arr)
        );
      }
    });
    socket.on("exception", (message) => {
      console.log("exception", message);
    });
    socket.on("updatedUserStatus", (message) => {
      console.log("updatedUserStatus", message);
    });
  };

  const renderBubble = (props) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Bubble
          {...props}
          textStyle={{
            right: {
              color: R.colors.White,
              fontFamily: R.fonts.defaultRegular,
            },
            left: {
              color: R.colors.DarkGrey,
              fontFamily: R.fonts.defaultRegular,
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: R.colors.White,
              borderWidth: 1,
              borderColor: R.colors.BorderLightGrey,
            },
            right: {
              backgroundColor: R.colors.PrimaryColorDark,
            },
          }}
        />
      </View>
    );
  };

  const handleUrlPress = (url, matchIndex /*: number*/) => {
    Linking.openURL(url);
  };
  console.log("messgesss==", messages);
  return (
    // <SafeAreaView edges={["right", "bottom", "left"]}>
    <View
      style={{
        flex: 1,
        paddingBottom: Platform.OS == "ios" ? screenHeightInPercent(4) : 0,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: R.colors.White,
          height:
            Platform.OS == "ios"
              ? screenHeightInPercent(13)
              : screenHeightInPercent(11),
          paddingHorizontal: screenWidthInPercent(5),
          paddingTop: 30,
        }}
      >
        <View style={{}}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ padding: 5 }}
          >
            <IconB name={"arrow-left"} color={R.colors.MediumGrey} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: R.fonts.Inter_bold,
              fontSize: screenHeightInPercent(2.1),
              color: R.colors.Black,
              textAlign: "center",
            }}
          >
            Butler
          </Text>
        </View>
        <View style={{}}>
          {endChat && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert("End Chat", "Are you sure want to end this chat", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      dispatch(setAppLoading(true));
                      endChatAPI(chatRoomID)
                        .then((res) => {
                          console.log("end Response==>", res);
                          dispatch(setAppLoading(false));
                          dispatch(getSupportChats());
                          console.log("room tyle ==", roomType)
                          if (roomType == "support") {
                            props.navigation.goBack();
                            props.navigation.pop(2);
                          } else {
                            props.navigation.goBack();
                          }
                        })
                        .catch((err) => {
                          dispatch(setAppLoading(false));
                          console.log("err=>", err);
                        });
                    },
                  },
                ]);
              }}
              style={{
                height: 30, // screenHeightInPercent(3.3),
                backgroundColor: "#F04D4D",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: 12,
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: R.fonts.Inter_bold,
                  fontSize: screenHeightInPercent(1.3),
                  color: R.colors.White,
                }}
              >
                END CHAT
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {renderActionSheet()}
      <GiftedChat
        alignTop={true}
        messagesContainerStyle={{}}
        wrapInSafeArea={false}
        placeholder={"Enter message..."}
        {...{ messages, onSend, renderMessageVideo }}
        user={{
          _id: userData._id,
          name: userData.fullName,
          avatar: "https://facebook.github.io/react/img/logo_og.png",
        }}
        listViewProps={{ audioPlaying: audioPlaying }}
        renderInputToolbar={renderInputToolbar}
        minInputToolbarHeight={Platform.OS === "ios" ? hp("7%") : hp("9.5%")}
        keyboardShouldPersistTaps={"never"}
        shouldUpdateMessage={(props, nextProps) =>
          props.listViewProps.audioPlaying !==
          nextProps.listViewProps.audioPlaying
        }
        scrollToBottom={true}
        scrollToBottomStyle={{
          backgroundColor: R.colors.PrimaryColorDark,
          color: "#fff",
          opacity: 1,
        }}
        loadEarlier={loadEarlier}
        renderUsernameOnMessage={true}
        onLoadEarlier={() => getMessages()}
        isLoadingEarlier={loader}
        renderDay={(props) => {
          return <Day {...props} />;
        }}
        parsePatterns={(linkStyle) => [
          {
            type: "url",
            style: {
              color: "blue",
              textDecorationLine: "underline",
              fontFamily: R.fonts.defaultMedium,
            },
            onPress: handleUrlPress,
          },
        ]}
        showUserAvatar={true}
        renderMessageAudio={(props) => renderMessageAudio(props, audioPlaying)}
        renderBubble={renderBubble}
        renderSystemMessage={(t) => {
          if (
            t?.currentMessage?.isSystem &&
            t?.currentMessage?.text.substring(0, 20) ==
              "Click here to view the Invoice for".substring(0, 20)
          ) {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log("id", props?.route?.params?.chatRoomID);
                  dispatch(setAppLoading(true));
                  getInvoiceDetail(props?.route?.params?.chatRoomID)
                    .then((res) => {
                      console.log('invoice response==>', res.invoice)
                      dispatch(setAppLoading(false));
                      if (res?.invoice) {
                        props.navigation.navigate("InvoiceDetails", {
                          data: res.invoice,
                        });
                      }
                    })
                    .catch((err) => {
                      dispatch(setAppLoading(false));
                      console.log("err", err);
                    });
                }}
                style={{
                  width: screenWidthInPercent(40),
                  backgroundColor: R.colors.PrimaryColorDark,
                  borderRadius: 16,
                  marginHorizontal: 12,
                  padding: 12,
                }}
              >
                <View
                  style={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    backgroundColor: "#FFF1DC",
                    alignItems: "center",
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: R.fonts.Maven_bold,
                      fontSize: 40,
                      color: "#FFB23E",
                    }}
                  >
                    $
                  </Text>
                  <Text
                    style={{
                      fontFamily: R.fonts.Maven_bold,
                      fontSize: 12,
                      color: R.colors.Black,
                    }}
                  >
                    Invoice
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: R.colors.White,
                    marginTop: 14,
                    alignSelf: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 20,
                    marginBottom: 7,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: R.fonts.Maven_bold,
                      fontSize: 12,
                      color: R.colors.Black,
                    }}
                  >
                    View
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    userData: userDataSelector(state),
  };
}

export default connect(mapStateToProps)(ChatSingle);
