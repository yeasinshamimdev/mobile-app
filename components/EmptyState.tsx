import { View, Text } from "react-native";
import React from "react";
import { SvgUri, SvgXml } from "react-native-svg";
import { xml } from "@/assets/svg/svgConstants";

const EmptyState = () => {
  return (
    <View className="w-full flex items-center "> 
      <SvgXml xml={xml} width={"100%"} className="mt-16" />
      <Text className=" text-center mt-4 text-lg text-gray-900">
        No wall found
      </Text>
    </View>
  );
};

export default EmptyState;
