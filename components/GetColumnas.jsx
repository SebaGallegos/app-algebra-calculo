// Componente que muestra en una tabla el nombre de las tablas y sus columnas

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { DataTable, Text } from "react-native-paper";

export default function GetColumnas({ updateKey }) {
  const db = useSQLiteContext();
  const [tablas, setTablas] = useState([]);
  const [columnas, setColumnas] = useState({});

  useEffect(() => {
    async function getTablas() {
      try {
        const result = await db.getAllAsync(
          "SELECT name FROM sqlite_master WHERE type='table';",
        );
        setTablas(result.map((tabla) => tabla.name));
      } catch (error) {
        console.log(error);
        setTablas([]);
      }
    }
    getTablas();
  }, [updateKey]);

  useEffect(() => {
    async function getColumnas() {
      let columnasPorTabla = {};
      for (let tabla of tablas) {
        try {
          const result = await db.getAllAsync(`PRAGMA table_info(${tabla});`);
          columnasPorTabla[tabla] = result;
        } catch (error) {
          console.log(error);
        }
      }
      setColumnas(columnasPorTabla);
    }
    if (tablas.length > 0) {
      getColumnas();
    }
  }, [tablas, updateKey]);

  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tablas</Text>
      {Object.entries(columnas).map(([tabla, columnasTabla], index) => (
        <DataTable key={index}>
          <DataTable.Header>
            <DataTable.Title>{tabla}</DataTable.Title>
          </DataTable.Header>
          {columnasTabla.map((columna, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <Text>{columna.name}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ))}
    </>
  );
}
