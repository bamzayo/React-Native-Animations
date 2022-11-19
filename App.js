import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  BounceIn,
  BounceInLeft,
} from "react-native-reanimated";

const LIST_ITEM_COLOR = "#1798DE";

export default function App() {
  const [items, setItems] = React.useState(
    new Array(5).fill(0).map((_, i) => ({ id: i }))
    // []
  );
  const initalMode = React.useRef(true);

  useEffect(() => {
    initalMode.current = false;
  }, []);

  const onAdd = React.useCallback(() => {
    setItems((curr) => {
      const nextItemId = (curr[curr.length - 1]?.id ?? 0) + 1;
      return [...curr, { id: nextItemId }];
    });
  }, []);

  const deleteItem = React.useCallback((id) => {
    setItems((curr) => curr.filter((item) => item.id !== id));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ marginVertical: 50 }}
      >
        {items.map((item, i) => {
          return (
            <Animated.View
              onTouchEnd={() => deleteItem(item.id)}
              key={item.id}
              exiting={FadeOut}
              entering={initalMode ? FadeIn.delay(100 * i) : FadeIn}
              layout={Layout.delay(100)}
              style={styles.listItem}
            ></Animated.View>
          );
        })}
      </ScrollView>
      <TouchableOpacity onPress={onAdd} style={styles.floatBtn}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 20,
    // shadow for android
    elevation: 10,
    // shadow for ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  floatBtn: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 35,
    backgroundColor: "gold",
    position: "absolute",
    bottom: 30,
    right: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: "#fff",
    margin: 0,
    padding: 0,
  },
});
