import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import Resultado from "./Resultado";

export default function Consulta({ SQL }) {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync(`${SQL}`);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    }
    setup();
  }, [SQL]);

  return <Resultado sql={SQL} data={data} />;
}
