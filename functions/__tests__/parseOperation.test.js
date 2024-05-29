import {parseOperation} from '../parseOperation';

test('parseOperation: error sentencia -> null', () => {
    expect(parseOperation(" ")).toBe(null);
    // Arreglar esto
    // expect(parseOperation("cualquiercosa")).toBe(null);
})

test('parseOperation: Seleccion', () => {
    expect(parseOperation("sel[(tabla)")).toBe(null);
    expect(parseOperation("sel()")).toBe('SELECT * FROM ');
    expect(parseOperation('sel(tabla)'))
        .toBe('SELECT * FROM tabla');
    expect(parseOperation('sel[a=1,b="hola mundo"](tabla)'))
        .toBe('SELECT * FROM tabla WHERE a=1 AND b="hola mundo"')
})

test('parseOperation: Proyeccion', () => {
    expect(parseOperation('proy[a](tabla)'))
        .toBe('SELECT a FROM tabla');
    expect(parseOperation('proy[a,b](tabla)'))
        .toBe('SELECT a, b FROM tabla');
    // subconsulta
    expect(parseOperation('proy[a,b](sel(tabla))'))
        .toBe('SELECT a, b FROM (SELECT * FROM tabla) AS subquery');
    // subconsulta select con condiciones
    expect(parseOperation('proy[a,b](sel[a=1,b="hola mundo"](tabla))'))
        .toBe('SELECT a, b FROM (SELECT * FROM tabla WHERE a=1 AND b="hola mundo") AS subquery');
});

test('parseOperation: Union', () => {
    expect(parseOperation('tabla1 U tabla2'))
        .toBe('SELECT * FROM tabla1 UNION SELECT * FROM tabla2');
    expect(parseOperation('sel[arg1=1](tabla1) U sel[arg2=2](tabla2)'))
        .toBe('SELECT * FROM tabla1 WHERE arg1=1 UNION SELECT * FROM tabla2 WHERE arg2=2');
})