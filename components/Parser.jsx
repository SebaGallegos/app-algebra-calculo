import Consulta from "./Consulta";
import { parseOperation } from "../functions/parseOperation.js";

export default function Parser({ sentencia }) {
  const SQL = parseOperation(sentencia);
  return SQL ? <Consulta SQL={SQL} /> : null;
}
