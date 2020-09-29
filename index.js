const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            for (const todo of getTodos())
                console.log(todo);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function getTodos() {
    return files
        .map(file => file.match(/\/\/.*todo.*/gi))
        .flat(Infinity)
        .filter(x => x)
        .sort((a, b) => countItem(b, '!') - countItem(a, '!'));
}

function countItem(string, item){
    return string.split('').reduce((p, i) => i === item ? p + 1 : p, 0);
}

// TODO you can do it!
