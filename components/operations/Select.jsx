import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import Resultado from "../Resultado";

export default function Select({ tabla }) {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setup() {
      try {
        const result = await db.getAllAsync(`SELECT * FROM ${tabla}`);
        setData(result);
      } catch (error) {
        console.log(error);
      }
    }
    setup();
  }, [tabla]);

  return <Resultado data={data} />;
}
