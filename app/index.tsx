import { useLogin } from "@/feature/useAuth";
import { loginSchema } from "@/helper/schema/authSchema";
import { setToken } from "@/utils/storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";

type FormDataProps = z.infer<typeof loginSchema>;
export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { mutate: loginMutation } = useLogin({
    onSuccess: async (response) => {
      const token = response.token;
      await setToken(token);
      Alert.alert("Berhasil", "Login berhasil");
      router.replace("/menu/dashboard"); // Arahkan ke dashboard
    },
    onError: (error: any) => {
      Alert.alert("Gagal", error.message || "Login gagal");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: FormDataProps) => {
    setLoading(true);
    loginMutation(data); // hanya ini, cukup
  };

  const logo = require("@/assets/images/login.jpg");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ marginBottom: 16 }}>
        <Image source={logo} style={{ width: 300, height: 300 }} />
      </View>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        AMP Berdikari
      </Text>

      <View style={{ gap: 4, marginBottom: 10 }}>
        <Controller
          control={control}
          name="login"
          rules={{ required: "Username wajib diisi" }}
          render={({ field: { onChange, value } }) => (
            <View style={{ gap: 4 }}>
              <Text>Username</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 12,
                  width: 300,
                }}
                placeholder="Username"
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.login && (
          <Text style={{ color: "red" }}>{errors.login.message}</Text>
        )}
      </View>

      <View style={{ gap: 4, marginBottom: 10 }}>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password wajib diisi" }}
          render={({ field: { onChange, value } }) => (
            <View style={{ gap: 4 }}>
              <Text>Password</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 12,
                  width: 300,
                }}
                placeholder="Password"
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            </View>
          )}
        />
        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password.message}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          {
            backgroundColor: "#0066cc",
            padding: 15,
            borderRadius: 24,
            alignItems: "center",
            width: 300,
          },
          loading && { backgroundColor: "#999" },
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
