import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, //가장 쉽게 work travel 나눠가고 text input까지만 ㅂ
  TouchableHighlight,
  TouchableWithoutFeedback, //그래픽 UI 변화없이
  TextInput, //화면에 가장 위에서 일어나는 탭 이벤트를 listen (UI변화x) 애니메이션만없음
  // 1)텍스트 인풋 import 2)<TextInput> 추가
  ScrollView, //#3.4 텍스트입력시 보이도록하기
} from "react-native";
import { theme } from "./color";
import React, { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true); //#3.2
  const [text, setText] = useState(""); //기본값""주고 유저가 입력하면 payload 저장
  const [toDos, setToDos] = useState({}); // 배열[] 객체{} 넣기 배열대신 {} 넣음
  // 설명: Object.assign({}, toDos, {[Date.now()]:{work:true}}); 이런식으로 객체에 추가로 넣을 수 있어서 객체를 사용함
  // toDos를 변경시키는 것이 아니라 새로운 toDos를 이용해서 변경함

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const addToDo = () => {
    alert(text);
    if (text === "") {
      return;
    }

    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { text, work: working },
    // });
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working },
    };
    setToDos(newToDos);
    setText("");
  };

  console.log(toDos);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "red" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            travel
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder={working ? "Add a to Do" : "where do you wanna go"}
          onSubmitEditing={addToDo}
          style={styles.input}
        >
          {/* 
            onChangeText : 바뀌면 알려줌 
            Object.key(x) 이렇게하면 x object의 key를 얻을 수 있다.
            Object.key(x).map(key => x[key]) 을 하면 그 key들의 내용을 볼 수 있음.
          */}
        </TextInput>
      </View>
      <ScrollView styles="qweqwe">
        {Object.keys(toDos).map((key) => (
          toDos[key].working === working ? <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View> : null
        ))}
      </ScrollView>
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
    marginBottom: 20,
    fontSize: 18,
  },
  toDo: {
    color: "white",
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
