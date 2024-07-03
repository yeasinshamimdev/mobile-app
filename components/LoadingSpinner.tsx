import { ActivityIndicator, Text } from "react-native";

const LoadingSpinner = () => {
  return (
    <Text style={{ margin: "auto" }}>
      <ActivityIndicator color={"#6941C6"} size={"large"} />
    </Text>
  );
};

export default LoadingSpinner;
