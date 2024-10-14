// Componente para ejecutar sentencias SQL directo en la base de datos

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import Resultado from "./ResultadoSQL";

export default function ConsultaSQL({ SQL }) {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setup() {
      try {
        // Dividir las sentencias SQL
        const sentencias = SQL.split(';').filter(s => s.trim() !== '');

        for (let sentencia of sentencias) {
          if (sentencia.trim().toLowerCase().startsWith('select')) {
            // Para consultas SELECT, usamos getAllAsync
            const result = await db.getAllAsync(sentencia);
            setData(result);
          } else {
            // Para otras sentencias (CREATE, INSERT, etc.), usamos execAsync
            await db.execAsync(sentencia);
          }
        }

        // Si no hay resultados de SELECT, ejecutamos un SELECT * de la tabla creada
        if (data.length === 0) {
          const tableName = SQL.match(/CREATE TABLE IF NOT EXISTS (\w+)/i)?.[1];
          if (tableName) {
            const result = await db.getAllAsync(`SELECT * FROM ${tableName}`);
            setData(result);
          }
        }
      } catch (error) {
        console.log(error);
        setData([{ error: error.toString() }]);
      }
    }
    setup();
  }, [SQL]);

  return <Resultado sql={SQL} data={data} />;
}