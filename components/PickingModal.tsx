import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const MyModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
    </>
    // <View style={styles.container}>
    //   <Button title="Open Modal" onPress={() => setModalVisible(true)} />

    //   <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={() => {
    //     setModalVisible(false);
    //   }}
    // >
    //   <View style={styles.centeredView}>
    //     <View style={styles.modalView}>
    //       <View style={styles.content}>
    //         <View style={styles.imageContainer}>
    //           {/* <Image
    //             here={""}
    //             style={styles.image}
    //           /> */}
    //         </View>
    //         <View style={styles.detailsContainer}>
    //           <View style={styles.detail}>
    //             <View style={styles.icon}>
    //               {/* <CircleBroken size={20} /> */} bRO
    //             </View>
    //             <Text style={styles.text}>Put in sortbox</Text>
    //             <Text style={styles.text}>
    //                 TOTE233
    //               {/* {sortBoxSuggestLoading ? 'Loading...' : sortBoxData?.identifier} */}
    //             </Text>
    //           </View>
    //           <View style={styles.detail}>
    //             <View style={styles.icon}>
    //               {/* <Tag size={20} /> */}t
    //             </View>
    //             <Text style={styles.text}>SKU: SEW234</Text>
    //           </View>
    //           <View style={styles.detail}>
    //             <View style={styles.icon}>
    //               {/* <DotsGrid size={20} /> */} Dot
    //             </View>
    //             <Text style={styles.text}>
    //              1 of 0 sorted
    //             </Text>
    //           </View>
    //           <View style={styles.detail}>
    //             <View style={styles.icon}>
    //               {/* <ShoppingCart size={20} /> */} cart
    //             </View>
    //             <Text style={styles.text}>Order #333444</Text>
    //           </View>
    //         </View>
    //       </View>
    //       <Button title="Close" onPress={() => setModalVisible(false)} />
    //     </View>
    //   </View>
    // </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 20,
      width: '80%',
      alignItems: 'center',
      elevation: 5, // shadow on Android
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageContainer: {
      maxWidth: 190,
      height: 'auto',
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    detailsContainer: {
      padding: 20,
      borderRadius: 12,
      maxWidth: 320,
      width: '100%',
      borderWidth: 1,
      borderColor: 'gray',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    detail: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    icon: {
      marginRight: 12,
    },
    text: {
      fontSize: 16,
      color: 'gray',
    },
  });
  

export default MyModal;
