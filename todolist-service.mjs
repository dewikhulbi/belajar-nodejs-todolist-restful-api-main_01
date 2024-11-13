export class TodolistService {
    constructor() {
        this.todos = [
            { id: 1, task: "Belajar Node.js", completed: false },
            { id: 2, task: "Mengerjakan tugas", completed: true }
        ];
    }

    getTodoList(request, response) {
        response.end(JSON.stringify(this.todos));
    }

    createTodo(request, response) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const newTodo = JSON.parse(body);
            newTodo.id = this.todos.length + 1;
            this.todos.push(newTodo);
            response.end(JSON.stringify({ message: "Todo created", todo: newTodo }));
        });
    }

    updateTodo(request, response) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const updatedTodo = JSON.parse(body);
            const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                this.todos[index] = { ...this.todos[index], ...updatedTodo };
                response.end(JSON.stringify({ message: "Todo updated", todo: this.todos[index] }));
            } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ error: "Todo not found" }));
            }
        });
    }

    deleteTodo(request, response) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const { id } = JSON.parse(body);
            const index = this.todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                this.todos.splice(index, 1);
                response.end(JSON.stringify({ message: "Todo deleted" }));
            } else {
                response.statusCode = 404;
                response.end(JSON.stringify({ error: "Todo not found" }));
            }
        });
    }
}