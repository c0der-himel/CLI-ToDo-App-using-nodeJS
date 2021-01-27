/*/
 * Title: CLI-ToDo-App-using-nodeJS
 * Description: A command line ToDo App using nodeJS
 * Author: Himel
 * Date: 27/01/2021
/*/

const path = require('path');
const Todo = require('./Todo');
const { argv } = require('yargs');
const { saveFile, readFile } = require('./utils');
const { ADD, UPDATE, DONE, NEXT, LIST, FIND } = require('./commands');

const fileName = './data.json';
const filePath = path.resolve(__dirname, fileName);

(function init() {
  const data = readFile(filePath) || [];
  const todo = new Todo(data);
  const { _: baseCommand } = argv;

  switch (baseCommand[0]) {
    case ADD: {
      todo.addItem(argv.text);
      saveFile(todo.todoList, filePath);
      console.log('✅ Todo Added ✅');
      break;
    }
    case UPDATE: {
      todo.updateItem(argv.id, argv.text);
      saveFile(todo.todoList, filePath);
      console.log('⚡ Todo Updated ⚡');
      break;
    }
    case DONE: {
      todo.doneItem();
      console.log('✅ One Item Completed ✅');
      saveFile(todo.todoList, filePath);
      break;
    }
    case NEXT: {
      const item = todo.nextItem();
      console.log(`${item.id} - ${item.text} - [${item.created}]`);
      break;
    }
    case FIND: {
      const items = todo.findItem(argv.term);
      if (items.length === 0) {
        console.log('❌ No Item Found ❌');
        break;
      }
      for (let i = 0; i < items.length; i++) {
        console.log(
          `${items[i].id} - ${items[i].text} - [${items[i].created}]`
        );
      }
      break;
    }
    case LIST: {
      if (todo.todoList.length === 0) {
        console.log('🗑 List is Empty 🗑');
        break;
      }
      for (let i = 0; i < todo.todoList.length; i++) {
        console.log(
          `${todo.todoList[i].id} - ${todo.todoList[i].text} - [${todo.todoList[i].created}]`
        );
      }
      break;
    }
    default: {
      throw new Error('❌ Command Not Found ❌');
    }
  }
})();
