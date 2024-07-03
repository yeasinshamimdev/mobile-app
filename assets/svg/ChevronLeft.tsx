import { Svg, Path } from "react-native-svg";

const ChevronLeft = ({
  size,
  currentColor,
}: {
  size: number;
  currentColor: string;
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none" 
    >
      <Path
        d="M12.5 15L7.5 10L12.5 5"
        stroke={currentColor}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronLeft;
