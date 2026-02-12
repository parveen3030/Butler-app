import React, { Component, useEffect, useState, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  Button,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../../assets";
import { Categories } from "../../../containers/preview/categories";
import { SubCategories } from "../../../containers/preview/subCategories";
import { userDataSelector } from "../../../redux/auth/selectors";
import { createChatRoom } from "../../../network/chatApi";
import HomeFreelancer from "./index";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import { animator, categoryList, designer } from "../../../utils/data";
import { setAppLoading } from "../../../redux/app/actions";
import { BottomSheet } from "react-native-sheet";

const CreateJob = (props) => {
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const sheetRef = useRef(null);

  const selectCategory = (item) => {
    setCategory(item);
    sheetRef.current.show();
    if (item.name == "Animators") {
      setSubCategoriesList(animator);
    } else if (item.name == "Designers") {
      setSubCategoriesList(designer);
    }
  };

  const submit = (data) => {
    sheetRef.current.hide();
    setTimeout(() => {
      dispatch(setAppLoading(true));
      createChatRoom(data?.name)
        .then((res) => {
          dispatch(setAppLoading(false));
          if (res?._id) {
            props.navigation.navigate("ChatSingle", {
              chatRoomID: res?._id,
              endChat: true,
            });
          }
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
          Alert.alert(
            err.message,
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ],
            { cancelable: false }
          );
        });
    }, 380);
  };

  const renderSelectCategoryView = (category) => {
    // if (!category) {
    return (
      <View style={{}}>
        <Text
          style={{
            fontFamily: R.fonts.BalooBhai_regular,
            fontSize: screenHeightInPercent(2.8),
            color: R.colors.Black,
            textAlign: "center",
            textDecorationLine: "underline",
            marginTop: screenHeightInPercent(2),
          }}
        >
          Choose a Category
        </Text>
        <Categories
          categoriesList={categoryList}
          onSelectCategory={selectCategory}
          itemContainerStyle={{ width: "100%" }}
          containerStyle={{ marginTop: 5 }}
          textStyle={{
            fontSize: hp("3%"),
            color: R.colors.White,
          }}
        />
        <BottomSheet
          // backdropClosesSheet={false}
          onRequestClose={() => navigation.goBack()}
          borderRadius={30}
          showDragIcon={false}
          height={screenHeightInPercent(75)}
          dragIconStyle={{ width: screenWidthInPercent(35), height: 4 }}
          ref={sheetRef}
          colorScheme="light"
          sheetStyle={{
            backgroundColor: "#81C9A6",
            padding: 20,
          }}
        >
          <TouchableOpacity
            // onPress={() => setCategory(null)}
            disabled={true}
            activeOpacity={1}
            style={{
              marginBottom: screenHeightInPercent(2.4),
            }}
          >
            <Text
              style={{
                fontSize: screenHeightInPercent(3.2),
                color: R.colors.White,
                fontFamily: R.fonts.Maven_medium,
                textAlign: "center",
              }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: screenHeightInPercent(1.8),
              color: R.colors.DarkBlack,
              fontFamily: R.fonts.BalooBhai_medium,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Choose a Sub-Category
          </Text>

          <ScrollView
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
          >
            <SubCategories
              categoriesList={subCategoriesList}
              category={category}
              onSelectCategory={category ? submit : setCategory}
              containerStyle={{ marginTop: 0 }}
              textStyle={{
                fontFamily: R.fonts.defaultMedium,
                fontSize: hp("1.5%"),
                textAlign: "left",
                color: R.colors.Black,
                marginTop: 10,
              }}
            />
            <View style={{ height: 20 }} />
          </ScrollView>
        </BottomSheet>
      </View>
    );
  };

  return props.userData?.userType === "client" ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#81C9A6",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: R.colors.White }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // padding: 10,
            height: screenHeightInPercent(6),
            borderBottomColor: R.colors.BorderColor,
            // borderBottomWidth: 1,
            backgroundColor: "#81C9A6",
          }}
        >
          <Text
            style={{
              fontSize: screenHeightInPercent(4),
              color: R.colors.DefaultTextColor,
              fontFamily: R.fonts.ArialBold,
              color: R.colors.White,
            }}
          >
            Butler
          </Text>
        </View>
        {props.userData?.userType === "client" && (
          <View style={{ flex: 1 }}>
            <Image
              style={{
                width: screenWidthInPercent(94),
                resizeMode: "contain",
                alignSelf: "center",
                height: screenHeightInPercent(12),
                marginTop: screenHeightInPercent(1),
              }}
              source={R.images.cloud}
            />
            {renderSelectCategoryView(category)}

            {/* <Button
                title="Rating"
                onPress={() => props.navigation.navigate("PaymentCard")}
              /> */}

              <Image
                style={{
                  width: screenWidthInPercent(100),
                  resizeMode: "contain",
                  height: screenHeightInPercent(12),
                  backgroundColor: R.colors.White,
                  position: "absolute",
                  bottom: 0,
                }}
                source={R.images.birds}
              />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  ) : (
    <HomeFreelancer />
  );
};

function mapStateToProps(state) {
  return {
    userData: userDataSelector(state),
  };
}

export default connect(mapStateToProps)(CreateJob);
