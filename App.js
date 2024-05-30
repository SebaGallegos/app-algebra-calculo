import { SQLiteProvider } from "expo-sqlite";
import { TextInput, View } from "react-native";
import { Button } from "react-native-paper";

import styles from "./styles/estilos.js";
import Parser from "./components/Parser.jsx";

import { useState, useEffect } from "react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [expresion, setExpresion] = useState("");
  const [consulta, setConsulta] = useState("");

  const handleSubmit = () => {
    if (texto.trim() === "" || texto === expresion) {
      return;
    }
    console.log(`Orden en Algebra: ${texto}`);
    setExpresion(texto);
    setConsulta(texto);
  };

  useEffect(() => {
    if (expresion !== consulta) {
      setConsulta(expresion);
    }
  }, [expresion]);

  const handleButtonPress = (char) => {
    setTexto((prev) => prev + char);
  };

  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="estudiantes.db"
        assetSource={{ assetId: require("./database/estudiantes.db") }}
      >
        {consulta && <Parser sentencia={consulta} />}
      </SQLiteProvider>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Button
          onPress={() => {
            handleButtonPress("\u03C3");
          }}
        >
          {"\u03C3"}
        </Button>
        <Button
          onPress={() => {
            handleButtonPress("\u03C0");
          }}
        >
          {"\u03C0"}
        </Button>
        <Button
          onPress={() => {
            handleButtonPress("\u222A");
          }}
        >
          {"\u222A"}
        </Button>
        <Button
          onPress={() => {
            handleButtonPress("\u2229");
          }}
        >
          {"\u2229"}
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            flexGrow: 1,
            maxWidth: "80%",
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 15,
          }}
          onChangeText={(texto) => setTexto(texto)}
          value={texto}
          blurOnSubmit={false}
          multiline={false}
        />
        <View
          style={{
            height: 40,
            justifyContent: "center",
          }}
        >
          <Button onPress={handleSubmit}>Enviar</Button>
        </View>
      </View>
    </View>
  );
}
