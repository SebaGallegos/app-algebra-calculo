import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import Resultado from "../Resultado";

export default function Proyeccion({ tabla, columnas }) {
    const db = useSQLiteContext();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function setup() {
            try {
                const result = await db.getAllAsync(`SELECT ${columnas} FROM ${tabla}`);
                setData(result);
            } catch (error) {
                console.log(error);
            }
        }
        setup();
    }, []);

    return <Resultado data={data} />;
}