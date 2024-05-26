import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import styles from "../styles/styles.js";

export default function Resultado({ data }) {
  return (
    <DataTable style={styles.container}>
  {data.length > 0 && (
    <DataTable.Header style={styles.tableHeader}>
      {Object.keys(data[0]).map((key, index) => {
        return (
          <DataTable.Title key={index}>{key}</DataTable.Title>
        );
      })}
    </DataTable.Header>
  )}
  {data.map((value, index) => {
    return (
      <DataTable.Row key={index}>
        {Object.values(value).map((val, i) => {
          return (
            <DataTable.Cell key={i}>{val}</DataTable.Cell>
          );
        })}
      </DataTable.Row>
    );
  })}
</DataTable>
  );
}