import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../assets";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import Icons from "../common/Icons";

const Item = (props) => {
  const { item, disableSelection, selectCategory } = props;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          selectCategory(item);
        }}
        style={styles.card}
        disabled={disableSelection}
      >
        <Image style={styles.cardImg} source={item?.img} />
      </TouchableOpacity>
      <View style={[R.appStyles.rowSpaceBtwn, styles.titleRow]}>
        <View style={{ width: screenHeightInPercent(1) }} />
        <Text style={styles.title}>{item.name}</Text>
        <Icons
          onPress={() => setModalVisible(!modalVisible)}
          family={"Feather"}
          name="info"
          size={screenHeightInPercent(2)}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          //   onPress={() => setModalVisible(!modalVisible)}
          style={{
            backgroundColor: "#13152233",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              minHeight: screenHeightInPercent(22),
              width: screenWidthInPercent(72),
              backgroundColor: "white",
              borderRadius: screenHeightInPercent(1.3),
              padding: 16,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontFamily: R.fonts.BalooBhai_regular,
                fontSize: screenHeightInPercent(2),
                color: R.colors.Black,
                textDecorationLine: "underline",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.BalooBhai_regular,
                fontSize: screenHeightInPercent(1.5),
                color: R.colors.Black,
                marginTop: screenHeightInPercent(2),
              }}
            >
              {item?.info}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                marginTop: screenHeightInPercent(2),
                backgroundColor: R.colors.PrimaryColorDark,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: R.fonts.BalooBhai_regular,
                  fontSize: screenHeightInPercent(1.8),
                  color: R.colors.White,
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const SubCategories = (props) => {
  const {
    containerStyle,
    categoriesList,
    keyword,
    disableSelection,
    textStyle,
    length,
    boxStyle,
    onSelectCategory,
    subCategories,
    itemContainerStyle,
  } = props;
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  if (length) {
    categoriesList = categoriesList.splice(0, length);
  }
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {categoriesList?.length > 0 ? (
        <View style={[styles.ViewStyle, containerStyle]}>
          {categoriesList.map((item, index) => {
            if (
              !keyword ||
              (keyword &&
                item.name.toLowerCase().includes(keyword.toLowerCase()))
            ) {
              return (
                <Item
                  key={index}
                  subCategories={subCategories}
                  disableSelection={disableSelection}
                  textStyle={textStyle}
                  categoriesListLength={categoriesList.length}
                  index={index}
                  selectCategory={onSelectCategory}
                  boxStyle={boxStyle}
                  itemContainerStyle={itemContainerStyle}
                  item={item}
                />
              );
            } else {
              return null;
            }
          })}
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: hp("8%"),
          }}
        >
          <Text style={[styles.txtStyle]}>No categories found</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidthInPercent(42.4),
    height: screenHeightInPercent(19),
    backgroundColor: "#F7F7F7",
    borderRadius: screenHeightInPercent(2),
    justifyContent: "center",
    alignItems: "center",
  },
  titleRow: {
    alignItems: "center",
    marginTop: screenHeightInPercent(1.2),
    marginBottom: screenHeightInPercent(2.3),
    paddingHorizontal: screenHeightInPercent(1),
  },
  title: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(1.9),
    color: R.colors.Black,
  },
  cardImg: {
    width: screenWidthInPercent(28),
    height: screenHeightInPercent(15),
    resizeMode: "contain",
  },
  txtStyle: {
    color: R.colors.MediumDarkGrey,
    textAlign: "center",
    fontSize: hp("1.8%"),
    fontFamily: R.fonts.defaultMedium,
  },
  ViewStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: screenHeightInPercent(0.5),
  },
});
