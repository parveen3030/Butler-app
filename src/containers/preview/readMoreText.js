import React, {useState, useEffect, useCallback, Children} from "react";
import { Text } from "react-native";

const ReadMoreText = ({ readMoreStyle, children, textStyle }) => {
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [numLines, setNumLines] = useState(undefined);

    const toggleTextShown = () => {
        setTextShown(!textShown);
    };

    useEffect(() => {
        setNumLines(textShown ? undefined : 3);
    }, [textShown]);

    const onTextLayout = useCallback(
        (e) => {
            if (e.nativeEvent.lines.length > 3 && !textShown) {
                setShowMoreButton(true);
                setNumLines(3);
            }
        },
        [textShown],
    );

    return (
        <>
            <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={textStyle} ellipsizeMode="tail">
                {children}
            </Text>

            {showMoreButton ? (
                <Text onPress={toggleTextShown} suppressHighlighting={true} style={readMoreStyle}>
                    {textShown ? 'Read less' : 'Read more'}
                </Text>
            ) : null}
        </>
    );
};

export default ReadMoreText;