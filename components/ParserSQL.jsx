import Consulta from "./ConsultaSQL";


export default function ParserSQL({ sentencia }) {
    const SQL = sentencia;
    return SQL ? <Consulta SQL={SQL} /> : null;
  }
  