import { SQLiteProvider } from "expo-sqlite";
import { Text, View } from "react-native";

import styles from "./styles/styles.js";
import Select from "./components/operations/Select.jsx";
import Union from "./components/operations/Union.jsx";
import Proyeccion from "./components/operations/Proyeccion.jsx";

export default function App() {
  return (
    <View style={styles.container}>
        <SQLiteProvider
            databaseName="estudiantes.db"
            assetSource={{ assetId: require("./database/estudiantes.db") }}
        >
        <Proyeccion tabla={"estudiantes_BD"} columnas={"rut, nombre"}/>
      </SQLiteProvider>
    </View>
  );
}
