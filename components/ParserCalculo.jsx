// Componente que recibe una sentencia en cálculo relacional de tuplas y la convierte a SQL
// llamando a la función conversorCalculo

import ConsultaSQL from "./Consulta";
import { conversorCalculo } from "../functions/conversorCalculo.js";

export default function Parser({ sentencia }) {
    const SQL = conversorCalculo(sentencia);
    return SQL ? <ConsultaSQL SQL={SQL} /> : null;
}
