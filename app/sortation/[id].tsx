import ChevronLeft from "@/assets/svg/ChevronLeft";
import CircleBroken from "@/assets/svg/CircleBroken";
import DotsGrid from "@/assets/svg/DotsGrid";
import ShoppingCart from "@/assets/svg/ShoppingCart";
import SuccessTick from "@/assets/svg/SuccessTick";
import Tag from "@/assets/svg/Tag";
import { showToast } from "@/hooks/showToast";
import { useToken } from "@/hooks/tokenParser";
import useBarcode from "@/hooks/useBarcode";
import { useSortBoxStore } from "@/store/sortBoxStore";
import { useWallStore } from "@/store/wallStore";
import { IConfirmSortBoxPayload, ISortBoxSuggest } from "@/types/sortbox.type";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { debounce, throttle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ISearchedItem {
  item_id: string;
  sku: string;
  name: string;
  order: string;
  quantity_sorted: number;
  quantity: number;
  everlab_id: string;
  image: string;
}

interface iSocketUser {
  fullname: string;
  profile_picture: string;
  user_id: string;
}

const SingleWall = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { getSingleWall, singleWall, singleWallErr, isSingleWallLoading } =
    useWallStore();

  const { id } = useLocalSearchParams();
  const token = useToken();
  const navigation = useNavigation();
  const { barcodeData, handleKeyPress } = useBarcode();
  const [selectedItem, setSelectedItem] = useState<ISearchedItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string>("");
  const [wallActiveUsers, setWallActiveUsers] = useState<iSocketUser[] | []>(
    []
  );
  const [toastShown, setToastShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //socket url
  const socketUrl = `wss://api-v2-internal-beta.onrender.com/v1/api/wall/set/user/status/${token}/${id}`;
  const socketUrlForUser = `wss://api-v2-internal-beta.onrender.com/v1/api/wall/get/active/users/${token}/${id}`;

  //effect for setting user status
  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    const ws2 = new WebSocket(socketUrlForUser);

    ws.onopen = () => {
      ws.send(JSON.stringify({ status: "active" }));
    };

    // Throttle the WebSocket message handler to limit the rate of processing
    const handleWebSocketMessage = throttle((event: any) => {
      if (event !== null) {
        const data = JSON.parse(event.data);
        const isNewData = !data?.wall_users?.some((user: iSocketUser) =>
          wallActiveUsers?.some(
            (existingUser) => existingUser?.user_id === user?.user_id
          )
        );

        if (isNewData) {
          setWallActiveUsers(data?.wall_users);
        }
      }
    }, 2000);

    // Use the throttled function as the message handler
    ws2.onmessage = handleWebSocketMessage;

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ status: "inactive" }));
        ws.close();
        ws2.close();
      }
    };
  }, [token]);

  //getting single wall data
  useEffect(() => {
    if (token && id) {
      getSingleWall(id as string, token);
    }
  }, [token, id]);

  useEffect(() => {
    if (toastShown) {
      showToast("No item matched with the scanned barcode");
    }
  }, [toastShown]);

  useEffect(() => {
    if (singleWall) {
      setIsLoading(false);
    }
  }, [singleWall]);

  //set the barcode data when we scan it in a state
  useEffect(() => {
    if (barcodeData && barcodeData !== undefined) {
      setBarcode(barcodeData);
    }
  }, [barcodeData]);

  const handleFilterProduct = () => {
    if (barcode && singleWall?.items) {
      const searchedItem = singleWall?.items?.find(
        (item: any) => item?.everlab_id === barcode
      );

      if (!searchedItem) {
        setToastShown(true);
      } else if (searchedItem) {
        setSelectedItem(searchedItem);
        setIsModalOpen(true);
        setToastShown(false);
      }
    } else {
      // showToast("Item not found");
      setToastShown(false);
    }
  };

  // Debounce the handleFilterProduct function
  const debouncedHandleFilterProduct = useCallback(
    debounce(handleFilterProduct, 500),
    [barcode, singleWall]
  );

  // open modal for scanned item
  useEffect(() => {
    if (barcode) {
      debouncedHandleFilterProduct();
    }
  }, [barcode, singleWall, isModalOpen, debouncedHandleFilterProduct]);

  //submit handler
  const handleSubmit = () => {
    debouncedHandleFilterProduct();
  };

  const onRefresh = async () => {
    if (token && id) {
      setRefreshing(true);
      await getSingleWall(id as string, token);
      setRefreshing(false);
    }
  };

  const onChangeNumber = (e: any) => {
    setBarcode(e);
  };

  const handlePress = () => {
    setBarcode(barcode);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6941C6" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="h-full">
        {isSingleWallLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator
              size="large"
              color="#6941C6"
              className="text-primary-700"
            />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View className="h-full">
              <StatusBar style="dark" />
              <Text className="mt-5 p-6 text-3xl border-b-[1px] border-solid border-gray-200 font-semibold text-primary-700">
                EverlabOS
              </Text>
              <View className="p-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View className="flex-row justify-start items-center gap-1">
                    <ChevronLeft size={26} currentColor="#6941C6" />
                    <Text className="pb-2 text-xl font-medium text-primary-700">
                      Back
                    </Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-3xl font-semibold text-gray-900">
                      {singleWall?.name}
                    </Text>
                    <View className="flex flex-row items-center">
                      {wallActiveUsers?.slice(0, 2).map((user, i) => (
                        <View
                          key={i}
                          className="w-8 h-8 rounded-full overflow-hidden mr-1"
                        >
                          <Image
                            source={{ uri: user?.profile_picture }}
                            className="w-full h-full"
                          />
                        </View>
                      ))}
                      {wallActiveUsers?.length > 2 && (
                        <View className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                          <Text className="text-white font-bold">
                            +{wallActiveUsers.length - 2}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View className="flex-row items-center gap-2 py-1">
                    <Text className="text-lg font-normal">
                      Empty: {singleWall?.empty}
                    </Text>
                    <Text className="text-lg font-normal">
                      Slot: {singleWall?.slots}
                    </Text>
                    <Text className="text-lg font-normal">
                      Being Sorted: {singleWall?.being_sorted}
                    </Text>
                    <Text className="text-lg font-normal">
                      Ready to ship: {singleWall?.ready_to_ship}
                    </Text>
                  </View>
                </View>
                <TextInput
                  autoFocus={true}
                  onChangeText={onChangeNumber}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent)}
                  onPress={handlePress}
                  value={barcode}
                  placeholder="Scan barcode here..."
                  className="border-[1px] border-solid border-gray-300 bg-base-white p-4 text-lg text-gray-800 mt-5 rounded-lg shadow-md"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-full items-center justify-center mt-4 rounded-md bg-primary-700 h-10 text-center"
                >
                  <Text className="text-center font-medium text-base-white text-lg">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalOpen}
              onRequestClose={() => {
                setIsModalOpen(false);
              }}
            >
              <ModalData
                selectedItem={selectedItem as ISearchedItem}
                setIsModalOpen={setIsModalOpen}
                setBarcode={setBarcode}
                setSelectedItem={setSelectedItem}
                isModalOpen={isModalOpen}
              />
            </Modal>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    alignItems: "center",
    elevation: 5, // shadow on Android
  },
});
export default SingleWall;

interface IComponentProps {
  selectedItem: ISearchedItem;
  isModalOpen: boolean;
  setBarcode: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ISearchedItem | null>>;
}

const ModalData = ({
  selectedItem,
  setBarcode,
  isModalOpen,
  setIsModalOpen,
  setSelectedItem,
}: IComponentProps) => {
  const {
    sortBoxData,
    sortBoxSuggest,
    sortBoxSuggestErr,
    sortBoxSuggestLoading,

    isOffErr,
    isOffSortLight,
    offSortBoxLight,
    isClosingLight,

    confirmSortBox,
    confirmedSortation,
    isConfirmErr,
    isConfirmLoading,

    updateCreateSortBoxState,
  } = useSortBoxStore();
  const { id } = useLocalSearchParams();
  const token = useToken();
  const { barcodeData, handleKeyPress } = useBarcode();
  const [sortBoxCode, setSotBoxCode] = useState<string>("");

  useEffect(() => {
    if (isConfirmErr) {
      showToast(isConfirmErr);
    }
    if (confirmedSortation || isOffSortLight) {
      showToast(
        confirmedSortation
          ? "Sortation successful"
          : isOffSortLight
          ? "Sort light off"
          : ""
      );
      setIsModalOpen(false);
      setSelectedItem(null);
      setBarcode("");
    }

    return () => {
      updateCreateSortBoxState();
    };
  }, [isConfirmErr, confirmedSortation, isOffSortLight]);

  useEffect(() => {
    if (barcodeData) {
      setSotBoxCode(barcodeData);
    }
  }, [barcodeData]);

  useEffect(() => {
    if (selectedItem && token && isModalOpen && id) {
      const payload = {
        order_id: selectedItem?.order,
        wall_id: id,
      };
      if (payload) {
        sortBoxSuggest(payload as ISortBoxSuggest, token);
      }
    }
  }, [selectedItem, isModalOpen, token, id]);

  const handleSorationConfirm = async (token: string) => {
    const payload = {
      item_id: selectedItem?.item_id,
      order_Id: selectedItem?.order,
      sku: selectedItem?.sku,
      sortbox_id: sortBoxData?.id,
      wall_id: id as string,
      everlab_id: selectedItem?.everlab_id,
    };
    if (
      !sortBoxData ||
      selectedItem?.quantity_sorted === selectedItem?.quantity
    ) {
      showToast("Already picked or no sortbox found for this item");
      return;
    }
    if (payload && sortBoxData?.id && token) {
      await confirmSortBox(payload as IConfirmSortBoxPayload, token as string);
    }
  };

  useEffect(() => {
    if (sortBoxCode && isModalOpen && sortBoxData && token) {
      const isValidSortBox = sortBoxData?.identifier === sortBoxCode;
      if (isValidSortBox) {
        handleSorationConfirm(token);
      }
    }
  }, [sortBoxCode, sortBoxData, isModalOpen, token]);

  const handleCancel = async () => {
    if (sortBoxData && token) {
      const payload = {
        order_id: selectedItem?.order,
        wall_id: id as string,
      };
      await offSortBoxLight(payload, token);
    } else {
      // setIsModalOpen(false);
      // setSelectedItem(null);
      // setBarcode("");
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TextInput
          autoFocus={true}
          // onChangeText={onChangeNumber}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent)}
          // onPress={handlePress}
          value={barcodeData as string}
          placeholder="Scan barcode here..."
          className="hidden border-[1px] border-solid border-base-white bg-base-white p-4 text-lg text-gray-800 mt-5 rounded-lg shadow-md"
        />
        {selectedItem?.quantity === selectedItem?.quantity_sorted ? (
          <View className="h-20 flex justify-center items-center">
            <SuccessTick size={30} currentColor={"#12B76A"} />
            <Text className="text-lg text-success-500">
              Item is already picked
            </Text>
          </View>
        ) : (
          <View className="w-full flex-row items-start gap-2">
            <View className="w-1/3 border-[1px] border-solid border-gray-300 p-2 rounded-md">
              <Image
                source={{ uri: selectedItem?.image }}
                style={{ width: "auto", height: 100 }}
                resizeMode="contain"
              />
            </View>
            <View className="p-3 justify-center border-[1px] border-solid border-gray-300 rounded-lg w-2/3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View>
                    <CircleBroken size={18} currentColor="black" />
                  </View>
                  <Text className="text-md">Put in sortbox</Text>
                </View>
                <Text className="font-semibold">
                  {sortBoxSuggestLoading
                    ? "Loading..."
                    : sortBoxData?.identifier}
                </Text>
              </View>
              <View className="h-2"></View>
              <View className="  flex-row items-center gap-3">
                <View>
                  <Tag size={18} currentColor="black" />
                </View>
                <Text>SKU: {selectedItem?.sku}</Text>
              </View>
              <View className="h-2"></View>
              <View className="flex-row items-center gap-3">
                <View>
                  <DotsGrid size={20} />
                </View>
                <Text>
                  {selectedItem?.quantity_sorted} of {selectedItem?.quantity}{" "}
                  sorted
                </Text>
              </View>
              <View className="h-2"></View>
              <View className="flex-row items-center gap-3">
                <View>
                  <ShoppingCart size={20} />
                </View>
                <Text>Order #{selectedItem?.order}</Text>
              </View>
            </View>
          </View>
        )}
        <TouchableOpacity
          disabled={
            sortBoxSuggestLoading ||
            !sortBoxData ||
            selectedItem?.quantity === selectedItem?.quantity_sorted
          }
          className="w-full"
        >
          <View className="mt-4 w-full bg-purple-600  py-3 rounded-md justify-center items-center">
            <Text className="text-md text-white font-semibold">
              {isConfirmLoading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                "Confirm Slot"
              )}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          className="w-full"
          disabled={isConfirmLoading}
        >
          <View className="w-full bg-white border-[1px] border-solid border-gray-300 shadow-md mt-2 py-3 rounded-md justify-center items-center">
            <Text className="text-md text-black font-semibold">
              {isClosingLight ? (
                <ActivityIndicator color={"#6941C6"} />
              ) : (
                "Cancel"
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
