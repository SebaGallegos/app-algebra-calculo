import { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SQLiteProvider } from "expo-sqlite";

import styles from "./styles/estilos.js";
import { colores } from "./styles/colores.js";
import Parser from "./components/Parser.jsx";

export default function App() {
  const [texto, setTexto] = useState("");
  const [expresion, setExpresion] = useState("");
  const [consulta, setConsulta] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });

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
    const newText = [
      texto.slice(0, cursorPosition.start),
      char,
      texto.slice(cursorPosition.end),
    ].join("");
    setTexto(newText);

    setCursorPosition({
      start: cursorPosition.start + 1,
      end: cursorPosition.start + 1,
    });
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
          style={styles.Button}
          buttonColor={colores.colors.primary}
          mode={"contained"}
          onPress={() => {
            handleButtonPress("\u03C3"); // Selección
          }}
        >
          {"\u03C3"}
        </Button>
        <Button
          style={styles.Button}
          mode={"contained"}
          buttonColor={colores.colors.primary}
          onPress={() => {
            handleButtonPress("\u03C0"); // Proyección
          }}
        >
          {"\u03C0"}
        </Button>
        <Button
          style={styles.Button}
          buttonColor={colores.colors.primary}
          mode={"contained"}
          onPress={() => {
            handleButtonPress("\u222A"); // Union
          }}
        >
          {"\u222A"}
        </Button>
        <Button
          style={styles.Button}
          buttonColor={colores.colors.primary}
          mode={"contained"}
          onPress={() => {
            handleButtonPress("\u2229"); // Intersección
          }}
        >
          {"\u2229"}
        </Button>
        <Button
          style={styles.Button}
          buttonColor={colores.colors.primary}
          mode={"contained"}
          onPress={() => {
            handleButtonPress("-"); // Diferencia
          }}
        >
          {"-"}
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
          style={styles.textInput}
          placeholder={"Ingrese orden..."}
          onChangeText={(texto) => setTexto(texto)}
          onSelectionChange={(e) => {
            setCursorPosition(e.nativeEvent.selection);
          }}
          selection={cursorPosition}
          value={texto}
          blurOnSubmit={false}
          multiline={false}
          activeUnderlineColor={colores.colors.primary}
        />
        <View
          style={{
            height: 40,
            justifyContent: "center",
          }}
        >
          <Button
            onPress={handleSubmit}
            mode={"contained"}
            style={styles.Button}
            buttonColor={colores.colors.primary}
          >
            Enviar
          </Button>
        </View>
      </View>
    </View>
  );
}
