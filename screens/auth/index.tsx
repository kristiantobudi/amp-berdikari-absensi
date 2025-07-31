import { login } from "@/api/auth";
import { setToken } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type FormDataProps = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();

  const onSubmit = async (data: FormDataProps) => {
    setLoading(true);
    try {
      const response = await login(data.username, data.password);
      const token = response.data.token;

      await setToken(token);

      // Optional: Refresh App state or navigate
      Alert.alert("Berhasil", "Login berhasil");
      navigation.replace("/(tabs)/explore");
    } catch (error: any) {
      Alert.alert("Gagal", error.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Absensi</Text>
      <Controller
        control={control}
        name="username"
        rules={{ required: "Email wajib diisi" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              marginBottom: 10,
            }}
            placeholder="Email"
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.username && (
        <Text style={{ color: "red" }}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password wajib diisi" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              marginBottom: 10,
            }}
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={{ color: "red" }}>{errors.password.message}</Text>
      )}

      <TouchableOpacity
        style={[
          {
            backgroundColor: "#0066cc",
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
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
