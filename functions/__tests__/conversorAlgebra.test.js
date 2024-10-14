import { conversorAlgebra } from "../conversorAlgebra";

test("conversorAlgebra: error sentencia -> null", () => {
  expect(conversorAlgebra(" ")).toBe(null);
});

test("conversorAlgebra: Seleccion", () => {
  expect(conversorAlgebra("\u03C3[(tabla)")).toBe(null);
  expect(conversorAlgebra("\u03C3()")).toBe("SELECT * FROM ");
  expect(conversorAlgebra("\u03C3(tabla)")).toBe("SELECT * FROM tabla");
  expect(conversorAlgebra('\u03C3[a=1,b="hola mundo"](tabla)')).toBe(
    'SELECT * FROM tabla WHERE a=1 AND b="hola mundo"',
  );
});

test("conversorAlgebra: Proyeccion", () => {
  expect(conversorAlgebra("\u03C0[a](tabla)")).toBe("SELECT a FROM tabla");
  expect(conversorAlgebra("\u03C0[a,b](tabla)")).toBe("SELECT a, b FROM tabla");
  // subconsulta
  expect(conversorAlgebra("\u03C0[a,b](\u03C3(tabla))")).toBe(
    "SELECT a, b FROM (SELECT * FROM tabla) AS subquery",
  );
  // subconsulta select con condiciones
  expect(conversorAlgebra('\u03C0[a,b](\u03C3[a=1,b="hola mundo"](tabla))')).toBe(
    'SELECT a, b FROM (SELECT * FROM tabla WHERE a=1 AND b="hola mundo") AS subquery',
  );
});

test("conversorAlgebra: Union", () => {
  expect(conversorAlgebra("tabla1 \u222A tabla2")).toBe(
    "SELECT * FROM tabla1 UNION SELECT * FROM tabla2",
  );
  expect(conversorAlgebra("\u03C3[arg1=1](tabla1) \u222A \u03C3[arg2=2](tabla2)")).toBe(
    "SELECT * FROM tabla1 WHERE arg1=1 UNION SELECT * FROM tabla2 WHERE arg2=2",
  );
});

test("conversorAlgebra: Join", () => {
  expect(conversorAlgebra("Empleados ⨝ Empleados.id_empleado = Proyectos.id_proyecto Proyectos")).toBe(
      'SELECT * FROM "Empleados" AS Empleados INNER JOIN "Proyectos" AS Proyectos ON Empleados.id_empleado = Proyectos.id_proyecto'
  );
});
