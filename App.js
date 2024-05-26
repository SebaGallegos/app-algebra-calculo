import { SQLiteProvider } from "expo-sqlite";

import { StyleSheet, Text, View } from "react-native";
import SelectQuery from "./components/operations/SelectQuery.jsx";

export default function App() {
  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="estudiantes.db"
        assetSource={{ assetId: require("./database/estudiantes.db") }}
      >
        <SelectQuery tableName={"estudiantes_BD"} />
      </SQLiteProvider>

      <SQLiteProvider
        databaseName="estudiantes.db"
        assetSource={{ assetId: require("./database/estudiantes.db") }}
      >
        <SelectQuery tableName={"estudiantes_POO"} />
      </SQLiteProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
