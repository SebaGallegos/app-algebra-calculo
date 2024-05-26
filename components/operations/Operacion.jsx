import {getSql} from "ra-to-sql";
import {useSQLiteContext} from "expo-sqlite";
import {useEffect, useState} from "react";

import Resultado from "../Resultado";

export default function Operacion({operacion}) {
    const db = useSQLiteContext();
    const [data, setData] = useState();

    useEffect(() => {
        async function setup() {
            try {
                const result = await db.getAllAsync(getSql(operacion));
                setData(result);
            } catch (error) {
                console.log(error);
            }
        }
        setup();
    }, [data])

    return (
        <Resultado data={data}/>
    )
}