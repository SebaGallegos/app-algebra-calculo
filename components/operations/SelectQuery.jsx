import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function SelectQuery({ tableName }) {
  const db = useSQLiteContext();
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync(`SELECT * FROM ${tableName}`);
        setEstudiantes(result);
      } catch (error) {
        console.log(error);
      }
    }
    setup();
  }, []);

  return (
    <View>
      {estudiantes.map((estudiante, index) => {
        return (
          <View key={index}>
            <Text>
              {estudiante.rut +
                " - " +
                estudiante.nombre +
                " - " +
                estudiante.ingreso}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
