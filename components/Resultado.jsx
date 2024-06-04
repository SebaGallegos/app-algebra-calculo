import { DataTable } from "react-native-paper";

import styles from "../styles/estilos.js";
import { colores } from "../styles/colores";
import { Text } from "react-native";

export default function Resultado({ sql, data }) {
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
