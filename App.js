import { StatusBar } from "expo-status-bar";
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput //화면에 가장 위에서 일어나는 탭 이벤트를 listen (UI변화x)
} from "react-native";
import { theme } from "./color";
import React, { useState } from 'react';

export default function App() {
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey }}>travel</Text>
        </TouchableOpacity>
      </View>
        <View>
          <TextInput keyboardType="email-address" placeholder={working ? "Add a to Do" : "where do you want to go"} style={styles.input}>
            
          </TextInput>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 60,
  },

  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },

  btnText: {
    fontSize: 34,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 18,
  }
});
