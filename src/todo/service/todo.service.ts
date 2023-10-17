import { Injectable } from '@nestjs/common';
import { TodoType } from '../todo.type';
import { ErrorType } from 'src/types/error.type';
import { Io } from 'src/utils/io.utils';
import { resolve } from 'path';
const TodoData = new Io(resolve('src', 'db', 'todos.json'));

@Injectable()
export class TodoService {
  async getTodos(): Promise<TodoType[] | []> {
    try {
      const todos = await TodoData.read();
      return todos;
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }

  async createTodo(body: any): Promise<TodoType> {
    try {
      const todos = await TodoData.read();

      const id = (todos[0]?.id || 0) + 1;
      const newTodo: TodoType = {
        id,
        title: body.title,
        text: body.text,
        isCompleted: false,
      };

      todos.unshift(newTodo);

      await TodoData.write(todos);
      return newTodo;
    } catch (error: any) {
      console.log('createTodo: ' + error.message);
      return null;
    }
  }

  async deleteTodo(id: number): Promise<object | ErrorType> {
    try {
      let todos: TodoType[] = await TodoData.read();

      const foundTodo = todos.find((t) => t.id == id);
      if (!foundTodo) {
        return {
          message: 'Todo not found',
          error: 'NOT FOUND',
          statusCode: 404,
        };
      }

      const filteredTodos = todos.filter((t) => t.id !== foundTodo.id);

      todos = filteredTodos;

      await TodoData.write(todos);

      return {
        message: 'Your todo was deleted',
        statusCode: 200,
      };
    } catch (error: any) {
      console.log('deleteTodo: ' + error.message);
    }
  }

  async editTodo(id: number, body: any): Promise<TodoType | ErrorType> {
    try {
      const todos = await TodoData.read();

      const foundTodo = todos.find((t) => t.id == id);

      if (!foundTodo) {
        return {
          message: 'Todo not found',
          error: 'NOT FOUND',
          statusCode: 404,
        };
      }

      if (body.title && body.text) {
        foundTodo.title = body.title;
        foundTodo.text = body.text;
      } else if (body.title && !body.text) {
        foundTodo.title = body.title;
      } else if (!body.title && body.text) {
        foundTodo.text = body.text;
      } else if (!body.title && !body.text) {
        return {
          message: 'Please edit something',
          error: 'BAD REQUEST',
          statusCode: 400,
        };
      }

      await TodoData.write(todos);

      return foundTodo;
    } catch (error: any) {
      console.log('editTodo: ' + error.message);
    }
  }

  async isCompleted(id: number): Promise<TodoType | ErrorType> {
    const todos = await TodoData.read();

    const foundTodo = todos.find((t) => t.id == id);
    if (!foundTodo) {
      return {
        message: 'Todo not found',
        error: 'NOT FOUND',
        statusCode: 404,
      };
    }

    foundTodo.isCompleted === false
      ? (foundTodo.isCompleted = true)
      : (foundTodo.isCompleted = false);

    await TodoData.write(todos);
    return foundTodo;
  }
}
