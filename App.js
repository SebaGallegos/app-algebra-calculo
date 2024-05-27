import { SQLiteProvider } from "expo-sqlite";
import {TextInput, View} from "react-native";

import styles from "./styles/styles.js";
import Select from "./components/operations/Select.jsx";
import Union from "./components/operations/Union.jsx";
import RAtoSQL from "./RAtoSQL";

import {useState} from "react";

export default function App() {
    const [texto, setTexto] = useState('')

    const handleSubmit = () => {
        if (texto.trim() === ''){
            return;
        }
        console.log(texto);
        setTexto('')
    }

  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="datos.db"
        assetSource={{ assetId: require("./database/datos.db") }}
        >
        <Select tabla={"tabla1"} />
      </SQLiteProvider>

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={texto => setTexto(texto)}
            value={texto}
            onSubmitEditing={() => {
             RAtoSQL(texto);
             handleSubmit()
            }}
            blurOnSubmit={false}
        />

      {/* <SQLiteProvider
        databaseName="estudiantes.db"
        assetSource={{ assetId: require("./database/estudiantes.db") }}
      >
        <Union tabla1={"estudiantes_BD"} tabla2={"estudiantes_POO"} />
      </SQLiteProvider> */}
    </View>
  );
}
