import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import R from "../../assets";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";

const Item = (props) => {
  const { item, index, disableSelection, selectCategory } = props;
  return (
    <TouchableOpacity
      disabled={disableSelection}
      onPress={() => {
        selectCategory(item);
      }}
      style={{
        width: screenWidthInPercent(90),
        backgroundColor: "#c4c4c4",
        height: screenHeightInPercent(19),
        borderRadius: screenHeightInPercent(2),
        marginBottom: screenHeightInPercent(3),
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <ImageBackground
        imageStyle={{ resizeMode: "contain" }}
        style={{
          width: "100%",
          height: screenHeightInPercent(17),
          justifyContent: "center",
        }}
        source={index == 0 ? R.images.animatorImg : R.images.designerImg}
      >
        <Text
          style={{
            fontFamily: R.fonts.BalooBhai_medium,
            fontSize: screenHeightInPercent(3.7),
            color: R.colors.White,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {item.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const Categories = (props) => {
  const {
    categoriesList,
    containerStyle,
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

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <View
        style={[
          {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 50,
          },
          containerStyle,
        ]}
      >
        {categoriesList.map((item, index) => {
          if (
            !keyword ||
            (keyword && item.name.toLowerCase().includes(keyword.toLowerCase()))
          ) {
            return (
              <Item
                key={index}
                subCategories={subCategories}
                categoriesListLength={categoriesList.length}
                disableSelection={disableSelection}
                textStyle={textStyle}
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
    </Animated.View>
  );
};
