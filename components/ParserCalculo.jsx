import ConsultaSQL from "./Consulta";
import { parseOperationCalculo } from "../functions/parseOperationCalculo.js";

export default function Parser({ sentencia }) {
    const SQL = parseOperationCalculo(sentencia);
    return SQL ? <ConsultaSQL SQL={SQL} /> : null;
}
