import {parseOperation} from '../parseOperation';

test('parseOperation', () => {
    expect(parseOperation('sel(tabla)'))
        .toBe('SELECT * FROM tabla');
    expect(parseOperation('sel[a=1,b="hola mundo"](tabla)'))
        .toBe('SELECT * FROM tabla WHERE a=1 AND b="hola mundo"')
})