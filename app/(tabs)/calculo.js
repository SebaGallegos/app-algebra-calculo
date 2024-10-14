/* 
    calculo.js

    Archivo utilizado para definir la pantalla de Calculo de la aplicación.
    Se importan los componentes necesarios de React y React Native.
*/

import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SQLiteProvider } from "expo-sqlite";

import styles from "../../styles/estilos.js";
import { colores } from "../../styles/colores.js";
import ParserCalculo from "../../components/ParserCalculo.jsx";
import GetColumnas from "../../components/GetColumnas";

export default function Tab() {
    const [texto, setTexto] = useState("");
    const [expresion, setExpresion] = useState("");
    const [consulta, setConsulta] = useState("");
    const [posicionCursor, setPosicionCursor] = useState({ inicio: 0, final: 0 });
    const [updateKey, setUpdateKey] = useState(0);

    const handleClearScreen = () => {
        setConsulta("");
        setUpdateKey(prevKey => prevKey + 1); // Incrementa el valor de updateKey
    };

    const handleSubmit = () => {
        if (texto.trim() === "" || texto === expresion) {
            return;
        }
        console.log(`Orden en Calculo: ${texto}`);
        setExpresion(texto);
        setConsulta(texto);
    };

    useEffect(() => {
        if (expresion !== consulta) {
            setConsulta(expresion);
        }
    }, [expresion]);

    const handleButtonPress = (char) => {
        const nuevoTexto = texto + char;
        setTexto(nuevoTexto);

        setPosicionCursor({
            inicio: nuevoTexto.length,
            final: nuevoTexto.length,
        });
    };

    return (
        <View style={styles.container2}>
            <SQLiteProvider
                databaseName="database.db"
                assetSource={{ assetId: require("../../database/database.db") }}
            >
                {consulta ? (
                    <ParserCalculo sentencia={consulta} />
                ) : (
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={{ justifyContent: "center" }}
                    >
                        <GetColumnas updateKey={updateKey} />
                    </ScrollView>
                )}
            </SQLiteProvider>

            <View
                style={{
                    marginBottom: 10,
                }}
            >
                <Button
                    style={styles.Button}
                    buttonColor={colores.colors.primary}
                    mode={"contained"}
                    onPress={handleClearScreen}
                >
                    Ver Tablas
                </Button>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: 10
                }}
                style={{
                    flexGrow: 0
                }}
            >
                <Button
                    style={styles.Button}
                    buttonColor={colores.colors.primary}
                    mode={"contained"}
                    onPress={() => {
                        handleButtonPress("∧"); // Y
                    }}
                >
                    {"∧"}
                </Button>
                <Button
                    style={styles.Button}
                    buttonColor={colores.colors.primary}
                    mode={"contained"}
                    onPress={() => {
                        handleButtonPress("∨"); // Union
                        // handleButtonPress("U");
                    }}
                >
                    {"∨"}
                    {/* {"U"} */}
                </Button>
                <Button
                    style={styles.Button}
                    buttonColor={colores.colors.primary}
                    mode={"contained"}
                    onPress={() => {
                        handleButtonPress("∀"); // Para todo
                    }}
                >
                    {"∀"}
                </Button>
                <Button
                    style={styles.Button}
                    buttonColor={colores.colors.primary}
                    mode={"contained"}
                    onPress={() => {
                        handleButtonPress("∃"); // Existe
                    }}
                >
                    {"∃"}
                </Button>
                <Button
                    style={styles.Button}
                    buttonColor={colores.colors.primary}
                    mode={"contained"}
                    onPress={() => {
                        handleButtonPress("→"); // Existe
                    }}
                >
                    {"→"}
                </Button>
            </ScrollView>
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
                        setPosicionCursor(e.nativeEvent.selection);
                    }}
                    selection={posicionCursor}
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
