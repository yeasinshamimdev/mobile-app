import SignInWithOAuth from "@/components/SignInWithOAuth";
import { defaultStyles } from "@/constants/defaultStyle";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="h-full w-full bg-white">
      {!pendingVerification && (
        <View className="flex-1 justify-center items-center ">
          <View className="w-full bg-white p-4 rounded-lg shadow-md">
            <Text
              className="text-2xl font-bold mb-4 text-center"
              style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              Sign Up
            </Text>
            <TextInput
              // className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="First Name"
              autoCapitalize="none"
              value={firstName}
              style={[defaultStyles.inputField, { marginBottom: 10 }]}
              onChangeText={(firstName) => setFirstName(firstName)}
            />
            <TextInput
              // className="w-full p-2 mb-4 border border-gray-300 rounded"
              style={[defaultStyles.inputField, { marginBottom: 10 }]}
              placeholder="Last Name"
              autoCapitalize="none"
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
            />
            <TextInput
              // className="w-full p-2 mb-4 border border-gray-300 rounded"
              style={[defaultStyles.inputField, { marginBottom: 10 }]}
              placeholder="Email"
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
              // className="w-full p-2 mb-4 border border-gray-300 rounded"
              style={[defaultStyles.inputField, { marginBottom: 20 }]}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity
              // className="bg-blue-500 p-3 rounded-lg"
              style={defaultStyles.btn}
              onPress={onSignUpPress}
            >
              <Text
                // className="text-white text-center font-bold"
                style={defaultStyles.btnText}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View className="flex-1 justify-center items-center bg-gray-100">
          <View>
            <TextInput
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text className="text-white text-center font-bold">
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <SignInWithOAuth />
    </View>
  );
}
