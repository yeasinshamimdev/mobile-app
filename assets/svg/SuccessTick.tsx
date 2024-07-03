import { Path, Rect, Svg } from "react-native-svg";

const SuccessTick = ({
  size,
  currentColor,
}: {
  size: number;
  currentColor: string;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 33 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.2953 9.85322L13.7487 19.0666L11.2153 16.3599C10.7487 15.9199 10.0153 15.8932 9.482 16.2666C8.962 16.6532 8.81534 17.3332 9.13534 17.8799L12.1353 22.7599C12.4287 23.2132 12.9353 23.4932 13.5087 23.4932C14.0553 23.4932 14.5753 23.2132 14.8687 22.7599C15.3487 22.1332 24.5087 11.2132 24.5087 11.2132C25.7087 9.98655 24.2553 8.90655 23.2953 9.83989V9.85322Z"
        fill={currentColor}
      />
      <Rect
        x="1.5"
        y="1"
        width="30"
        height="30"
        rx="15"
        stroke={currentColor}
        strokeWidth="2"
      />
    </Svg>
  );
};

export default SuccessTick;
