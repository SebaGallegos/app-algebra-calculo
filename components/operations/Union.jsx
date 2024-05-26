import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import Resultado from "../Resultado";

export default function Union({ tabla1, tabla2 }) {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync(
          `SELECT * FROM ${tabla1} UNION SELECT * FROM ${tabla2}`
        );
        setData(result);
      } catch (error) {
        console.log(error);
      }
    }
    setup();
  }, [tabla1, tabla2]);

  return <Resultado data={data} />;
}
