import SignInWithOAuth from "@/components/SignInWithOAuth";
import { defaultStyles } from "@/constants/defaultStyle";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="h-full w-full bg-white">
      <View className="flex-1 justify-center items-center bg-white">
        <View className="w-full bg-white p-4 rounded-lg shadow-md">
          <Text
            className="text-2xl font-bold mb-4 text-center"
            style={{
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Sign In
          </Text>
          <TextInput
            style={[defaultStyles.inputField, { marginBottom: 10 }]}
            placeholder="Email"
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            style={[defaultStyles.inputField, { marginBottom: 20 }]}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={defaultStyles.btn} onPress={onSignInPress}>
            <Text style={defaultStyles.btnText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text className="text-xl text-center">Don't have an account?</Text>
        <Link
          href={"/sign-up"}
          className="text-xl text-center bg-blue-400 text-white p-1 rounded-full w-40 mx-auto mt-2"
        >
          <Text>Sign Up</Text>
        </Link>
      </View>
      <SignInWithOAuth />
    </View>
  );
}
