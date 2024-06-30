import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "../../styles/estilos";
import { Button, TextInput } from "react-native-paper";
import { colores } from "../../styles/colores";
import { SQLiteProvider } from "expo-sqlite";
import ParserSQL from "../../components/ParserSQL.jsx";

export default function Tab() {
  const [posicionCursor, setPosicionCursor] = useState({ inicio: 0, final: 0 });
  const [texto, setTexto] = useState("");
  const [expresion, setExpresion] = useState("");
  const [consulta, setConsulta] = useState("");

  const handleSubmit = () => {
    if (texto.trim() === "" || texto === expresion) {
      return;
    }
    console.log(`Orden SQL: ${texto}`);
    setExpresion(texto);
    setConsulta(texto);
  };
  return (
    <SQLiteProvider
      databaseName="estudiantes.db"
      assetSource={{ assetId: require("../../database/estudiantes.db") }}
    >
      <View style={{ flex: 1 }}>
        {consulta ? (
          <ParserSQL sentencia={consulta} />
        ) : (
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ justifyContent: "center" }}
          >
          </ScrollView>
        )}
        <TextInput
          style={[styles.textInputSQL, { width: '100%' }]}
          placeholder={"Ingrese orden SQL..."}
          onChangeText={(texto) => setTexto(texto)}
          onSelectionChange={(e) => {
            setPosicionCursor(e.nativeEvent.selection);
          }}
          selection={posicionCursor}
          value={texto}
          blurOnSubmit={false}
          multiline={true}
          numberOfLines={10}
          activeUnderlineColor={colores.colors.primary}
        />
        <View style={styles.container}>
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
    </SQLiteProvider>
  );
}
