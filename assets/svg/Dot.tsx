import { View } from "react-native";
import { Circle, Svg } from "react-native-svg";

const Dot = ({
  size,
  currentColor,
}: {
  size: number;
  currentColor: string;
}) => {
  return (
    <View>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 10 10"
        fill="none" 
      >
        <Circle cx="5" cy="5" r="4" fill={currentColor} />
      </Svg>
    </View>
  );
};

export default Dot;
