import { StatusBar } from "expo-status-bar";
import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback //화면에 가장 위에서 일어나는 탭 이벤트를 listen (UI변화x)
} from "react-native";
import { theme } from "./color";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight
          underlayColor="#DDDDDD"
          activeOpacity={0.5}
          onPress={() => console.log("누름!")}
        >
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
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
    color: "white",
  },
});
