import React, { useEffect, useState } from "react";
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
import CheckedIcon from "./checkedIcon";
import { getCategories } from "../../network/userApi";

const Item = (props) => {
	const {
		item,
		index,
		addSkill,
		removeSkill,
		disableSelection,
		textStyle,
		boxStyle,
	} = props;
	const [selected, setSelected] = useState(false);
	return (
		<View
			key={index}
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginTop: 15,
				marginRight: 10,
			}}
		>
			<TouchableOpacity
				disabled={disableSelection}
				onPress={() => {
					if (!selected) {
						addSkill(index);
					} else {
						removeSkill(index);
					}
					setSelected(!selected);
				}}
				style={[
					{
						height: hp("3.5%"),
						color: "rgba(255, 255, 255, 1)",
						justifyContent: "center",
						alignItems: "center",
						borderColor: selected
							? R.colors.PrimaryColorDark
							: R.colors.PrimaryColorLight,
						borderWidth: 1,
						color: "#353635",
						flexDirection: "row",
						borderRadius: 8,
						paddingHorizontal: 10,
						backgroundColor: R.colors.White,
					},
					boxStyle,
				]}
			>
				{selected && (
					<CheckedIcon>
						<Icon name="check-circle" size={hp("2%")} />
					</CheckedIcon>
				)}
				<Text
					style={[
						{
							marginLeft: selected ? 5 : 0,
							color: R.colors.DarkBlack,
							fontSize: hp("1.5%"),
							fontFamily: R.fonts.defaultMedium,
						},
						textStyle,
					]}
				>
					{item.name}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export const Skills = (props) => {
	const {
		containerStyle,
		keyword,
		skills,
		onChangeSkills,
		disableSelection,
		textStyle,
		length,
		boxStyle,
		userSkillsList,
	} = props;

	const [skillsList, setSkillsList] = useState([]);
	useEffect(() => {
		getCategories()
			.then((data) => {
				if (data?.categories) {
					let categories = [];
					data?.categories?.forEach((element) => {
						if (userSkillsList) {
							if (userSkillsList.includes(element._id)) {
								categories.push({ id: element._id, name: element.name });
							}
						} else {
							if (!element.path) {
								categories.push({ id: element._id, name: element.name });
							}
						}
					});
					setSkillsList(categories);
				}
				// console.log('categories', data);
			})
			.catch((err) => {});
	}, []);

	const addSkill = (index) => {
		const newSkills = [...skills];
		newSkills.push(skillsList[index]);
		onChangeSkills(newSkills);
	};
	const removeSkill = (index) => {
		const newSkills = skills.filter((item) => item.id != skillsList[index].id);
		onChangeSkills(newSkills);
	};

	return (
		<View style={[{ flexDirection: "row", flexWrap: "wrap" }, containerStyle]}>
			{skillsList.map((item, index) => {
				if (
					!keyword ||
					(keyword && item.name.toLowerCase().includes(keyword.toLowerCase()))
				) {
					return (
						<Item
							key={index}
							addSkill={addSkill}
							disableSelection={disableSelection}
							removeSkill={removeSkill}
							textStyle={textStyle}
							index={index}
							boxStyle={boxStyle}
							item={item}
						/>
					);
				} else {
					return null;
				}
			})}
		</View>
	);
};
