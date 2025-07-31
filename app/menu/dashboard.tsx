import { getCurrentTime } from "@/helper/clockTime";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DashboardMenu() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const profile = require("@/assets/images/profile.png");
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 50,
        paddingHorizontal: 20,
        flexGrow: 1,
        backgroundColor: "#e2f8c0",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          gap: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "#e2f8c0",
            borderRadius: 60,
            padding: 10,
            borderColor: "#074a05",
            borderWidth: 1,
          }}
        >
          <Image
            source={profile}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#e2f8c0",
            }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 12, color: "#074a05" }}>Good Morning,</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#074a05" }}>
            Kristianto Budi Purwoko
          </Text>
          <Text style={{ fontSize: 12, color: "#074a05" }}>IT Engeneer</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "#e2f8c0",
          paddingVertical: 30,
          alignItems: "center",
          marginVertical: 30,
        }}
      >
        <Text style={{ fontSize: 12, color: "#555" }}>time show</Text>
        <Text
          style={{
            fontSize: 48,
            fontWeight: "bold",
            marginTop: 10,
            color: "#074a05",
          }}
        >
          {currentTime}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1, alignItems: "center", gap: 5 }}>
          <Text style={{ fontSize: 14, marginBottom: 6 }}>-- : --</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#074a05",
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#e2f8c0" }}>Check in</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", gap: 5 }}>
          <Text style={{ fontSize: 14, marginBottom: 6 }}>-- : --</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#074a05",
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#e2f8c0" }}>Check out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 30, gap: 12 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#e2f8c0",
            padding: 14,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#074a05",
          }}
        >
          <Ionicons name="time-outline" size={24} color="#074a05" />
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#074a05" }}>
            Riwayat Absensi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#e2f8c0",
            padding: 14,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#074a05",
          }}
        >
          <MaterialCommunityIcons name="chart-bar" size={24} color="#074a05" />
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#074a05" }}>
            Rata Rata Jam Pekerjaan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#e2f8c0",
            padding: 14,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#074a05",
          }}
        >
          <FontAwesome5 name="calendar-times" size={24} color="#074a05" />
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#074a05" }}>
            Terbaru
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
