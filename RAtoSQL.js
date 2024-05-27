export default function RAtoSQL(operation) {
    const match = operation.match(/(\w+)\[(.*?)\]\((.*?)\)/);

    if (match) {
        const [_, operation, table, columns] = match;
        console.log(match)
    } else {
        console.log('No match', match)
    }
}