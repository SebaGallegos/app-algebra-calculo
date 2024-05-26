import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function SelectQuery({ tableName }) {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync(`SELECT * FROM ${tableName}`);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    }
    setup();
  }, []);

  return (
    <View>
      {data.length > 0 && <Text>{Object.keys(data[0]).join(" - ")}</Text>}
      {data.map((element, index) => {
        return (
          <View key={index}>
            <Text>{Object.values(element).join(" - ")}</Text>
          </View>
        );
      })}
    </View>
  );
}
