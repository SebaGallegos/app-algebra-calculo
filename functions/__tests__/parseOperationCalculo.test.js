import { parseOperationCalculo } from "../parseOperationCalculo";

describe('parseOperationCalculo con cuantificadores y condiciones', () => {
    test('Cuantificador existencial', () => {
        const sentenciaCuantificadores1 = "{f | Estudiantes_BD(f) ∧ ∃g(Estudiantes_POO(g) ∧ f.rut = g.rut)}";
        expect(parseOperationCalculo(sentenciaCuantificadores1)).toBe("SELECT * FROM Estudiantes_BD WHERE EXISTS (SELECT 1 FROM Estudiantes_POO g WHERE Estudiantes_BD.rut = g.rut)");
    });

    test('Cuantificador universal', () => {
        const sentenciaCuantificadores2 = "{f | Estudiantes_BD(f) ∧ ∀g(Estudiantes_POO(g) → f.Ingreso <= g.Ingreso)}";
        expect(parseOperationCalculo(sentenciaCuantificadores2)).toBe("SELECT * FROM Estudiantes_BD WHERE NOT EXISTS (SELECT 1 FROM Estudiantes_POO g WHERE NOT(Estudiantes_BD.Ingreso <= g.Ingreso))");
    });

    test('Cuantificador existencial 2', () => {
        const sentencia1 = "{f | Empleados(f) ∧ ∃g(Departamentos(g) ∧ f.salario > 30000)}";
        expect(parseOperationCalculo(sentencia1)).toBe("SELECT * FROM Empleados WHERE EXISTS (SELECT 1 FROM Departamentos g WHERE Empleados.salario > 30000)");
    });

    test('Cuantificador universal 2', () => {
        const sentencia2 = "{f | Proyectos(f) ∧ ∀g(Empleados(g) → f.presupuesto > g.salario)}";
        expect(parseOperationCalculo(sentencia2)).toBe("SELECT * FROM Proyectos WHERE NOT EXISTS (SELECT 1 FROM Empleados g WHERE NOT(Proyectos.presupuesto > g.salario))");
    });

    test('Condiciones múltiples', () => {
        const sentenciaMultiple = "{f | Estudiantes_BD(f) ∧ f.Ingreso<2020}";
        expect(parseOperationCalculo(sentenciaMultiple)).toBe("SELECT * FROM Estudiantes_BD WHERE Estudiantes_BD.Ingreso<2020");
    });

    test('Proyección', () => {
        const sentenciaMultiple2 = "{f.rut, f.nombre | Estudiantes_BD(f)}";
        expect(parseOperationCalculo(sentenciaMultiple2)).toBe("SELECT rut, nombre FROM Estudiantes_BD");
    });

    test('Selección y proyección', () => {
        const sentenciasp = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020}";
        expect(parseOperationCalculo(sentenciasp)).toBe("SELECT rut, nombre FROM Estudiantes_BD WHERE Estudiantes_BD.Ingreso<2020");
    });

    test('Unión con V', () => {
        const sentenciaUnionV = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020} V {f.rut, f.nombre | Estudiantes_POO(f) ∧ f.Ingreso<2022}";
        expect(parseOperationCalculo(sentenciaUnionV)).toBe("SELECT rut, nombre FROM Estudiantes_BD WHERE Estudiantes_BD.Ingreso<2020 UNION SELECT rut, nombre FROM Estudiantes_POO WHERE Estudiantes_POO.Ingreso<2022");
    });

    test('Unión con U', () => {
        const sentenciaUnionU = "{f.rut, f.nombre | Estudiantes_BD(f) ∧ f.Ingreso<2020} U {f.rut, f.nombre | Estudiantes_POO(f) ∧ f.Ingreso<2022}";
        expect(parseOperationCalculo(sentenciaUnionU)).toBe("SELECT rut, nombre FROM Estudiantes_BD WHERE Estudiantes_BD.Ingreso<2020 UNION SELECT rut, nombre FROM Estudiantes_POO WHERE Estudiantes_POO.Ingreso<2022");
    });
});