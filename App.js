
import Checkbox from 'expo-checkbox';
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
  ScrollView,
  Alert, //#3.4 텍스트입력시 보이도록하기
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { theme } from "./color";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';  //휴지통아이콘
const STORAGE_KEY = "@toDos";









export default function App() {
  const [working, setWorking] = useState(true); //#3.2
  const [text, setText] = useState(""); //기본값""주고 유저가 입력하면 payload 저장
  const [toDos, setToDos] = useState({}); // 배열[] 객체{} 넣기 배열대신 {} 넣음
  // 설명: Object.assign({}, toDos, {[Date.now()]:{work:true}}); 이런식으로 객체에 추가로 넣을 수 있어서 객체를 사용함
  // toDos를 변경시키는 것이 아니라 새로운 toDos를 이용해서 변경함
  const [modalVisible, setModalVisible] = useState(false);

  const [workTravelTap, setWorkTravelTap] = useState(true);
  
  const [isChecked, setChecked] = useState(false); //체크박스

  console.log(workTravelTap);


  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  

  //set아이템
  const saveToDos = async (toSave) => {
    //async storage에 데이터를 저장함
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }
  //get아이템
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    //console.log(s);
    //console.log(JSON.parse(s));
    if(s){
      setToDos(JSON.parse(s));
    }
  }
  //마운트될 때 load하게끔 
  useEffect(() => {
    loadToDos(); //저장이됨!!
  }, []);










  const addToDo = async () => {
    alert(text);
    if (text === "") {
      return;
    }

    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { text, work: working },
    // });
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, isChecked },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  console.log(toDos);

  const deleteToDo = (key) => {
    if(Platform.OS === "web"){
      const ok = confirm("Do you want to delete this To Do?")
      if(ok){
        const newToDos = {...toDos} //mutating state는 mutate하면안됨
        delete newToDos[key] //새롭게 만들어줌
        setToDos(newToDos); //update the state
        saveToDos(newToDos); //save that action 
      }
    } else {
      Alert.alert("삭제할거야?", "진짜로?",[
        {text:"취소"},
        {text:"삭제", onPress: async() => {
          const newToDos = {...toDos} //mutating state는 mutate하면안됨
          delete newToDos[key] //새롭게 만들어줌
          setToDos(newToDos); //update the state
          saveToDos(newToDos); //save that action 
        }}
      ]);
    }
  }
  const editToDoChk = async(key) => {
    // Alert.alert("수정하기");
    console.log("체크박스 수정함수 실행");
    const newToDos = {...toDos} 
    //delete newToDos[key] 객체값수정
    // setToDos(newToDos);
    // saveToDos(newToDos);
  }



  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ 
              fontSize: 34,
              fontWeight: "600", color: working ? "red" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: "600",
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

            {/* 체크박스 */}
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              onPress={editToDoChk()}
              color={isChecked ? '#4630EB' : "red"}
            />
            
            <Text style={toDos[key].done === true ? styles.toDoText : styles.toDoTextLineThrough}>{toDos[key].text}</Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AntDesign name="edit" size={18} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteToDo(key)}>
              <AntDesign name="delete" size={18} color="white" />
            </TouchableOpacity>

          </View> : null
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  toDoTextLineThrough: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  checkbox: {
    margin: 8,
  },
});


/*

toDO App 만들면서 학습한 개념 
onSubmitEditing = 키보드done버튼누르면 실행되는 함수
... es6 문법 다른 아이템을 합치는 기능. 비슷한거 = Object.assign
keytype

onPress 눌렀다 때는것
persistence
touchable
alert
react.js 스킬 
style
input


*/

/*
코드챌린지
1. async이용해서 마지막 저장 단계 탭으로 이동해서 시작하기
내가 어딨는지 기억해

2. toDo list 펑션만들고 ----보이도록해
아이콘을 추가하고 완료했으면 --------찍 그어서 놓고 finish true false이런식
function 하나만들고 key값으로 toDo를 찾고 수정해서 done:true false구분
새로수정된toTo를 state에 저장해야겠지? 
function state를 mutate하면 안댐 async storeage를 써야함 

3. toDo를 완료로 둘 수 있으면 수정할 수 있도록 해보기
todo의 완료표시를 할 수 있다면 완료 수정 삭제 
 
*/