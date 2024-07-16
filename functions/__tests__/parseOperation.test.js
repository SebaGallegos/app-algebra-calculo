import { parseOperation } from "../parseOperation";

test("parseOperation: error sentencia -> null", () => {
  expect(parseOperation(" ")).toBe(null);
});

test("parseOperation: Seleccion", () => {
  expect(parseOperation("\u03C3[(tabla)")).toBe(null);
  expect(parseOperation("\u03C3()")).toBe("SELECT * FROM ");
  expect(parseOperation("\u03C3(tabla)")).toBe("SELECT * FROM tabla");
  expect(parseOperation('\u03C3[a=1,b="hola mundo"](tabla)')).toBe(
    'SELECT * FROM tabla WHERE a=1 AND b="hola mundo"',
  );
});

test("parseOperation: Proyeccion", () => {
  expect(parseOperation("\u03C0[a](tabla)")).toBe("SELECT a FROM tabla");
  expect(parseOperation("\u03C0[a,b](tabla)")).toBe("SELECT a, b FROM tabla");
  // subconsulta
  expect(parseOperation("\u03C0[a,b](\u03C3(tabla))")).toBe(
    "SELECT a, b FROM (SELECT * FROM tabla) AS subquery",
  );
  // subconsulta select con condiciones
  expect(parseOperation('\u03C0[a,b](\u03C3[a=1,b="hola mundo"](tabla))')).toBe(
    'SELECT a, b FROM (SELECT * FROM tabla WHERE a=1 AND b="hola mundo") AS subquery',
  );
});

test("parseOperation: Union", () => {
  expect(parseOperation("tabla1 \u222A tabla2")).toBe(
    "SELECT * FROM tabla1 UNION SELECT * FROM tabla2",
  );
  expect(parseOperation("\u03C3[arg1=1](tabla1) \u222A \u03C3[arg2=2](tabla2)")).toBe(
    "SELECT * FROM tabla1 WHERE arg1=1 UNION SELECT * FROM tabla2 WHERE arg2=2",
  );
});

test("parseOperation: Join", () => {
  expect(parseOperation("Empleados ⨝ Empleados.id_empleado = Proyectos.id_proyecto Proyectos")).toBe(
      'SELECT * FROM "Empleados" AS Empleados INNER JOIN "Proyectos" AS Proyectos ON Empleados.id_empleado = Proyectos.id_proyecto'
  );
});
