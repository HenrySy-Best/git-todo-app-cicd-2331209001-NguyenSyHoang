const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = [];
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        controller.handleAddTodo('Buy groceries');

        const todos = service.getTodos();
        expect(todos).toHaveLength(1);
        expect(todos[0].text).toBe('Buy groceries');
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Buy groceries');
        const id = service.getTodos()[0].id;

        controller.handleRemoveTodo(id);

        expect(service.getTodos()).toHaveLength(0);
    });
});