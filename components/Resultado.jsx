import { Text, View } from "react-native";

export default function Resultado({ data }) {
  return (
    <View>
      {data.length > 0 && <Text>{Object.keys(data[0]).join(" - ")}</Text>}
      {data.map((value, index) => {
        return (
          <View key={index}>
            <Text>{Object.values(value).join(" - ")}</Text>
          </View>
        );
      })}
    </View>
  );
}