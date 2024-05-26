import { SQLiteProvider } from "expo-sqlite";
import { Text, View } from "react-native";

import styles from "./styles/styles.js";
import Select from "./components/operations/Select.jsx";
import Union from "./components/operations/Union.jsx";
import Operacion from "./components/operations/Operacion.jsx";

export default function App() {
  return (
    <View style={styles.container}>
      {/*<SQLiteProvider
        databaseName="estudiantes.db"
        assetSource={{ assetId: require("./database/estudiantes.db") }}
        >
        <Select tabla={"estudiantes_BD"} />
      </SQLiteProvider>*/}

      {/* <SQLiteProvider
        databaseName="estudiantes.db"
        assetSource={{ assetId: require("./database/estudiantes.db") }}
      >
        <Union tabla1={"estudiantes_BD"} tabla2={"estudiantes_POO"} />
      </SQLiteProvider> */}

        <SQLiteProvider
        databaseName="estudiantes.db"
        assetSource={{ assetId: require("./database/estudiantes.db") }}
        >
        <Operacion operacion={"Sel[ingreso=2019](estudiantes_BD)"} />
      </SQLiteProvider>
    </View>
  );
}
