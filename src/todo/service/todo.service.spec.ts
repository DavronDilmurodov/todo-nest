import { TodoService } from './todo.service';
import { TodoType } from '../todo.type';
import { Response, response } from 'express';

describe('todo service', () => {
  let todoService: TodoService;

  const todo = {
    id: 1,
    title: 'alex',
    text: 'wake up',
    isCompleted: false,
  };

  beforeAll(() => {
    todoService = new TodoService();
  });

  it('createTodo', async () => {
    await expect(
      todoService.createTodo({ title: todo.title, text: todo.text }),
    ).resolves.toEqual(todo);
  });

  it('getTodos', async () => {
    const todos = await todoService.getTodos();

    expect(Array.isArray(todos)).toEqual(true);

    expect(todos.every((item) => typeof item === 'object')).toEqual(true);
  });

  it('editTodo', async () => {
    await expect(
      todoService.editTodo(2, { title: 'someone' }, response),
    ).resolves.toEqual(expect.any(Object));
  });

  it('deleteTodo', async () => {
    await expect(todoService.deleteTodo(1, response)).resolves.toEqual(
      expect.any(Object),
    );
  });

  it('isCompleted', async () => {
    await expect(todoService.isCompleted(1, response)).resolves.toEqual(
      expect.any(Object),
    );
  });
});
