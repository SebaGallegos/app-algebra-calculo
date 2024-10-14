// Componente que recibe una sentencia en álgebra relacional y la convierte a SQL
// llamando a la función conversorAlgebra

import ConsultaSQL from "./Consulta";
import { conversorAlgebra } from "../functions/conversorAlgebra.js";

export default function Parser({ sentencia }) {
  const SQL = conversorAlgebra(sentencia);
  return SQL ? <ConsultaSQL SQL={SQL} /> : null;
}
