import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../assets";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DocumentIcon from "../../assets/images/document_icon.svg";
import DocumentPickerRN from "react-native-document-picker";

function checkIsImage(file) {
  return file["type"] && file["type"].split("/")[0] == "image";
}

const Document = (props) => {
  const { item, index, removeDocument, documents } = props;
  const isImage = checkIsImage(item);
  return (
    <View
      key={index}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: index == 0 ? 5 : 15,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {isImage ? (
          <Image
            source={{ uri: item.uri }}
            resizeMode={"cover"}
            style={{ width: hp("6%"), height: hp("6%"), borderRadius: 10 }}
          />
        ) : (
          <DocumentIcon width={hp("6%")} />
        )}
        <View
          style={{
            marginLeft: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: R.colors.DarkBlack,
              fontSize: hp("1.8%"),
              fontFamily: R.fonts.defaultSemiBold,
            }}
          >
            {item.name && item.name.length > 16
              ? item.name.substr(0, 13) + "..."
              : item.name}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeDocument(index)} style={{}}>
        <Icon name={"close"} color={R.colors.Grey} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export const DocumentPicker = (props) => {
  const { containerStyle, allowMultiple, onChangeDocuments } = props;
  const [documents, setDocuments] = useState([]);

  const openDocumentPicker = () => {
    DocumentPickerRN.pick({
      allowMultiSelection: allowMultiple,
      type: [
        DocumentPickerRN.types.plainText,
        DocumentPickerRN.types.pdf,
        DocumentPickerRN.types.images,
      ],
    }).then((res) => {
      let documentsArr = allowMultiple ? [...documents, ...res] : res;
      setDocuments(documentsArr);
      onChangeDocuments(documentsArr);
    });
  };

  const removeDocument = (index) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
    onChangeDocuments(newDocuments);
  };

  return (
    <View style={containerStyle}>
      <FlatList
        style={{ marginVertical: 10 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 10 }}
        data={documents}
        extraData={documents}
        renderItem={({ item, index }) => (
          <Document
            item={item}
            index={index}
            removeDocument={removeDocument}
            documents={documents}
          />
        )}
      />
      {(allowMultiple || documents.length == 0) && documents.length <= 10 && (
        <TouchableOpacity
          onPress={() => openDocumentPicker()}
          style={[
            {
              height: hp("8%"),
              color: "rgba(255, 255, 255, 1)",
              justifyContent: "center",
              alignItems: "center",
              borderColor: R.colors.GreenOutlineColor,
              borderWidth: 1,
              color: "#353635",
              borderStyle: "dashed",
              flexDirection: "row",
              borderRadius: 12,
              paddingHorizontal: 15,
            },
          ]}
        >
          <Icon
            name="cloud-upload-outline"
            color={R.colors.PrimaryColorDark}
            size={hp("3%")}
          />
          <Text
            style={{
              marginLeft: 5,
              color: R.colors.PrimaryColorDark,
              fontSize: hp("2%"),
              fontFamily: R.fonts.defaultMedium,
            }}
          >
            Upload
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
