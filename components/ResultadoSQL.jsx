import { ScrollView, Text, View } from "react-native";

export default function Resultado({ sql, data }) {
    console.log(data)

    return (
        <>
            <View>
                <Text>Estado de la consulta: {data}</Text>
            </View>
        </>
    );
}
