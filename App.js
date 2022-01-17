import { StatusBar } from "expo-status-bar";
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, //가장 쉽게 work travel 나눠가고 text input까지만 ㅂ
  TouchableHighlight,
  TouchableWithoutFeedback, //그래픽 UI 변화없이 
  TextInput //화면에 가장 위에서 일어나는 탭 이벤트를 listen (UI변화x) 애니메이션만없음
  // 1)텍스트 인풋 import 2)<TextInput> 추가
} from "react-native";
import { theme } from "./color";
import React, { useState } from 'react';

export default function App() {
  const [working, setWorking] = useState(true); //#3.2 
  const [text, setText] = useState(""); //기본값""주고 유저가 입력하면 payload 저장
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>

        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "red" : theme.grey }}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey }}>travel</Text>
        </TouchableOpacity>

      </View>
      
        <View>
          <TextInput keyboardType="number-pad " onChangeText={onChangeText} value={text} placeholder={working ? "Add a to Do" : "where do you wanna go"} style={styles.input}>
            {/* onChangeText : 바뀌면 알려줌 */}
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
