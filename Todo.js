function generateID(arr) {
  if (arr.length === 0) return 1;
  return arr[arr.length - 1].id + 1;
}

class Todo {
  constructor(todoList = []) {
    this.todoList = todoList;
  }

  addItem(text) {
    const item = {
      text,
      id: generateID(this.todoList),
      created: new Date(),
    };
    this.todoList.push(item);
  }

  updateItem(id, text) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === id) {
        this.todoList[i].text = text;
        break;
      }
    }
  }

  doneItem() {
    return this.todoList.shift();
  }

  nextItem() {
    return this.todoList[0];
  }

  listItems() {
    return this.todoList;
  }

  findItem(term) {
    const result = [];
    for (let i = 0; i < this.todoList.length; i++) {
      const item = this.todoList[i];
      if (item.text.toLowerCase().includes(term.toLowerCase())) {
        result.push(item);
      }
    }
    return result;
  }
}

module.exports = Todo;
