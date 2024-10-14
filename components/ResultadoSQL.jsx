// Componente que muestra los resultados de una consulta SQL en una tabla
// TODO: Mostrar un mensaje de error si no se obtienen datos

import { ScrollView, Text, View } from "react-native";

export default function Resultado({ sql, data }) {
    console.log(data)

    return (
        <>
            <View>
                <Text>Sentencia ejecutada.</Text>
            </View>
        </>
    );
}
