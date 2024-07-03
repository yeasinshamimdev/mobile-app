// import { useState, useEffect, useRef } from "react";
// import { Keyboard } from "react-native";

// const useBarcode = () => {
//   const [barcodeData, setBarcodeData] = useState<string | null>("");
//   const timeoutRef = useRef<number | undefined>(undefined);

//   const handleKeyPress = (e: any) => {
//     // Ignore Shift, backspace, enter keys, command/control keys, Alt key, Caps Lock, and Tab key
//     if (
//       e.keyCode === 16 || // Shift
//       e.keyCode === 8 || // Backspace
//       e.keyCode === 13 || // Enter
//       e.ctrlKey || // Control
//       e.metaKey || // Command/Meta
//       e.altKey || // Alt
//       (e.getModifierState && e.getModifierState("CapsLock")) || // Caps Lock
//       e.key === "Tab" // Tab
//     ) {
//       return;
//     }

//     // Clear barcodeData after 1 second of inactivity
//     if (timeoutRef.current !== undefined) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = window.setTimeout(() => {
//       setBarcodeData("");
//     }, 1000);

//     setBarcodeData((prevBarcodeData) => prevBarcodeData + e.key);
//   };

//   return { barcodeData, handleKeyPress };
// };

// export default useBarcode;

import { useState, useEffect, useRef } from "react";
import { Keyboard } from "react-native";

const useBarcode = () => {
  const [barcodeData, setBarcodeData] = useState<string | null>("");
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleKeyPress = (e: any) => { 

    // Ignore Shift, enter keys, command/control keys, Alt key, Caps Lock, and Tab key
    if (
      e.key === 'Backspace' || 
      e.keyCode === 16 || // Shift
      e.keyCode === 13 || // Enter
      e.ctrlKey || // Control
      e.metaKey || // Command/Meta
      e.altKey || // Alt
      (e.getModifierState && e.getModifierState("CapsLock")) || // Caps Lock
      e.key === "Tab" // Tab
    ) {
      return;
    }

    // Clear barcodeData after 1 second of inactivity
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setBarcodeData("");
    }, 1000);

    // Append the key to the barcodeData
    setBarcodeData((prevBarcodeData) => {
      if (e.keyCode === 8) {
        // Handle backspace
        return prevBarcodeData ? prevBarcodeData.slice(0, -1) : "";
      }
      return prevBarcodeData + e.key;
    });
  };

  return { barcodeData, handleKeyPress };
};

export default useBarcode;
