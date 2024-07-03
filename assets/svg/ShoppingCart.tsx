import { Path, Svg } from "react-native-svg";

const ShoppingCart = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 21" fill="none">
      <Path
        d="M1.66666 2.16699H2.75513C2.96014 2.16699 3.06265 2.16699 3.14514 2.20469C3.21784 2.23792 3.27944 2.29135 3.32261 2.35861C3.3716 2.43495 3.3861 2.53643 3.41509 2.73938L3.80951 5.50033M3.80951 5.50033L4.68609 11.9432C4.79733 12.7608 4.85295 13.1696 5.04841 13.4773C5.22064 13.7484 5.46756 13.964 5.75945 14.0981C6.09071 14.2503 6.50328 14.2503 7.32841 14.2503H14.46C15.2454 14.2503 15.6382 14.2503 15.9591 14.109C16.2421 13.9844 16.4849 13.7835 16.6602 13.5288C16.8591 13.24 16.9326 12.8542 17.0796 12.0826L18.1826 6.29173C18.2343 6.02017 18.2602 5.88438 18.2227 5.77824C18.1898 5.68513 18.1249 5.60673 18.0396 5.55701C17.9424 5.50033 17.8041 5.50033 17.5277 5.50033H3.80951ZM8.33332 18.0003C8.33332 18.4606 7.96023 18.8337 7.49999 18.8337C7.03975 18.8337 6.66666 18.4606 6.66666 18.0003C6.66666 17.5401 7.03975 17.167 7.49999 17.167C7.96023 17.167 8.33332 17.5401 8.33332 18.0003ZM15 18.0003C15 18.4606 14.6269 18.8337 14.1667 18.8337C13.7064 18.8337 13.3333 18.4606 13.3333 18.0003C13.3333 17.5401 13.7064 17.167 14.1667 17.167C14.6269 17.167 15 17.5401 15 18.0003Z"
        stroke="black"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ShoppingCart;