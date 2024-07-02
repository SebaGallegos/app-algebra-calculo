import { useState, useEffect } from "react";
import { ScrollView, Text, View, Dimensions, StyleSheet, Modal } from "react-native";
import styles from "../../styles/estilos";
import { Button, TextInput } from "react-native-paper";
import { colores } from "../../styles/colores";
import { SQLiteProvider } from "expo-sqlite";
import ParserSQL from "../../components/ParserSQL.jsx";

const { width, height } = Dimensions.get('window');

export default function Tab() {
  const [posicionCursor, setPosicionCursor] = useState({ inicio: 0, final: 0 });
  const [texto, setTexto] = useState("");
  const [expresion, setExpresion] = useState("");
  const [consulta, setConsulta] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [resultados, setResultados] = useState("");

  const handleSubmit = () => {
    if (texto.trim() === "" || texto === expresion) {
      return;
    }
    console.log(`Orden SQL: ${texto}`);
    setExpresion(texto);
    setConsulta(texto);

    // Aquí deberías procesar la consulta SQL y obtener los resultados
    // Por ahora, simplemente mostraremos el texto de la consulta como resultado
    setModalVisible(true);
  };

  return (
      <SQLiteProvider
          databaseName="database.db"
          assetSource={{ assetId: require("../../database/database.db") }}
      >
        <View style={localStyles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TextInput
                style={[styles.textInputSQL, localStyles.input]}
                placeholder={"Ingrese orden SQL..."}
                onChangeText={(texto) => setTexto(texto)}
                onSelectionChange={(e) => {
                  setPosicionCursor(e.nativeEvent.selection);
                }}
                selection={posicionCursor}
                value={texto}
                blurOnSubmit={false}
                multiline
                textAlignVertical="top"
                activeUnderlineColor={colores.colors.primary}
            />
          </ScrollView>
          <Button
              onPress={handleSubmit}
              mode={"contained"}
              style={styles.Button}
              buttonColor={colores.colors.primary}
          >
            Enviar
          </Button>

          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
          >
            <View style={localStyles.centeredView}>
              <View style={localStyles.modalView}>
                <ScrollView style={localStyles.modalScroll}>
                  {consulta && <ParserSQL sentencia={consulta} />}
                </ScrollView>
                <Button
                    onPress={() => setModalVisible(false)}
                    mode={"contained"}
                    style={[styles.Button, { marginTop: 10 }]}
                    buttonColor={colores.colors.primary}
                >
                  Cerrar
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </SQLiteProvider>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    flex: 1,
    width: width - 20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    elevation: 5,
    maxHeight: '80%',
    width: '90%',
  },
  modalScroll: {
    maxHeight: '90%',
    width: '100%',
  },
});