import {parseOperation} from '../parseOperation';

test('parseOperation: error sentencia -> null', () => {
    expect(parseOperation(" ")).toBe(null);
    expect(parseOperation("cualquiercosa")).toBe(null);
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