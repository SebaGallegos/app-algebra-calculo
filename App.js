import { SQLiteProvider } from "expo-sqlite";
import {TextInput, View, Button} from "react-native";

import styles from "./styles/styles.js";
import Parser from "./components/Parser.jsx";

import {useState, useEffect} from "react";

export default function App() {
    const [texto, setTexto] = useState('')
    const [operation, setOperation] = useState('')
    const [query, setQuery] = useState('')

    const handleSubmit = () => {
        if (texto.trim() === '' || texto === operation){
            return;
        }
        console.log(`Orden en Algebra: ${texto}`);
        setOperation(texto);
        setQuery(texto);
    }

    useEffect(() => {
        if (operation !== query) {
            setQuery(operation);
        }
    }, [operation]);

    return (
        <View style={styles.container}>
            <SQLiteProvider
                databaseName="datos.db"
                assetSource={{ assetId: require("./database/datos.db") }}
            >
                {query && <Parser operation={query} />}
            </SQLiteProvider>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        flexGrow: 1,
                        maxWidth: '80%',
                        paddingLeft: 10,
                        paddingRight: 10,
                        fontSize: 15
                }}
                    onChangeText={texto => setTexto(texto)}
                    value={texto}
                    blurOnSubmit={false}
                    multiline={false}
                />
                <View style={{
                    height: 40,
                    justifyContent: 'center',
                }}>
                    <Button title={'Enviar'} onPress={handleSubmit} />
                </View>
            </View>
        </View>
    );
}