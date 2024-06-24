import { DataTable } from "react-native-paper";

import styles from "../styles/estilos.js";
import { colores } from "../styles/colores";
import { ScrollView, Text, View } from "react-native";

export default function Resultado({ sql, data }) {
  // Si data retorna null, se muestra un mensaje de error
  // Puede darse el caso de que la consulta no haya retornado datos
  // o que haya un error de ejecución SQL
  if (!data) {
    return (
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ justifyContent: "center" }}
        >
          <Text>No se obtuvieron los datos</Text>
        </ScrollView>
      </>
    );
  }

  console.log(data);

  return (
    <>
      <DataTable style={styles.container}>
        {/* Header */}
        {data.length > 0 && (
          <DataTable.Header style={styles.tableHeader}>
            {Object.keys(data[0]).map((key, index) => {
              return (
                <DataTable.Title key={index}>
                  <Text
                    style={{
                      color: colores.colors.text,
                    }}
                  >
                    {key}
                  </Text>
                </DataTable.Title>
              );
            })}
          </DataTable.Header>
        )}
        {/* Contenido de la tabla */}
        {data.map((value, index) => {
          return (
            <DataTable.Row key={index}>
              {Object.values(value).map((val, i) => {
                return <DataTable.Cell key={i}>{val}</DataTable.Cell>;
              })}
            </DataTable.Row>
          );
        })}
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 1 }}>
            <Text
              style={{
                textAlignVertical: "center",
              }}
            >
              SQL generado: {sql}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </>
  );
}
