import Dot from "@/assets/svg/Dot";
import EmptyState from "@/components/EmptyState";
import { useToken } from "@/hooks/tokenParser";
import { useWallStore } from "@/store/wallStore";
import { ISortBox } from "@/types/wall.types";
import { useAuth } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface IWallStatus {
  wall_id: string;
  status: boolean;
}

const Page = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return <ActivityIndicator color={"#6941C6"} size={"large"} />;
  }

  if (!isSignedIn && isLoaded) {
    return <Redirect href={"/sign-up"} />;
  }
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { getAllWalls, allWallErr, allWalls, isAllWallsLoading } =
    useWallStore();
  const token = useToken();
  const [wallStatuses, setWallStatuses] = useState([]);

  const socketUrl = `wss://api-v2-internal-beta.onrender.com/v1/api/wall/live/status/${token}`;

  // //effect for setting user status
  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    // ws2 for receiving user data
    ws.onmessage = (event) => {
      if (event !== null) {
        const data = JSON.parse(event?.data);
        setWallStatuses(data);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [token]);

  const checkStatus = (id: string) => {
    if (id && wallStatuses.length > 0) {
      const match = wallStatuses.find(
        (wallStatus: IWallStatus) => wallStatus?.wall_id === id
      );

      if (match) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        return match.status ?? false;
      }
    }

    return false;
  };

  useEffect(() => {
    if (token) {
      getAllWalls(token as string);
    }
  }, [token]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    // //api call
    await getAllWalls(token as string);
    setIsRefreshing(false);
  };

  return (
    <View className="p-4 h-full w-full bg-white">
      <StatusBar style="dark" />
      {isAllWallsLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size="large"
            color="#6941C6"
            className="text-primary-700"
          />
        </View>
      ) : (
        <FlatList
          data={allWalls}
          keyExtractor={(wall: any) => wall.id.toString()}
          ItemSeparatorComponent={() => <View className="h-4"></View>}
          renderItem={({ item }: any) => (
            <TouchableOpacity>
              <Link href={`/sortation/${item?.id}`}>
                <View className="h-fit rounded-xl shadow-lg w-[90vw] p-4 border-[1px] border-solid border-gray-200">
                  <View className="flex-row items-center justify-between w-full">
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`w-7 h-7 rounded-full items-center justify-center ${
                          checkStatus(item?.id) ? "bg-success-50" : "bg-gray-50"
                        }`}
                      >
                        <View
                          className={`w-5 h-5 rounded-full items-center justify-center ${
                            checkStatus(item?.id)
                              ? "bg-success-100"
                              : "bg-gray-100"
                          } `}
                        >
                          <Dot
                            size={12}
                            currentColor={
                              checkStatus(item?.id) ? "#12B76A" : "#667085"
                            }
                          />
                        </View>
                      </View>
                      <Text className="text-lg text-black font-semibold">
                        {item?.name}
                      </Text>
                    </View>
                    <Text className="text-sm border-[1px] border-solid border-gray-200 px-3 py-1 rounded-md">
                      {item?.max_users} users
                    </Text>
                  </View>
                  <View className="gap-[5px] justify-start items-center flex-row mt-3 flex-wrap">
                    {item?.sort_boxes?.map((box: ISortBox, i: number) => (
                      <View
                        key={i}
                        className={`h-[28px] w-[28px] rounded-sm ${
                          box?.is_sorted ? "bg-success-400" : "bg-gray-300"
                        }`}
                      ></View>
                    ))}
                  </View>
                </View>
              </Link>
            </TouchableOpacity>
          )}
          ListHeaderComponent={() => (
            <View className="mb-5">
              <Text className="text-xl font-semibold ">Sortation Walls</Text>
              <Text className="text-md text-gray-900">
                Select a wall and start sorting items
              </Text>
            </View>
          )}
          ListEmptyComponent={() => <EmptyState />}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Page;
