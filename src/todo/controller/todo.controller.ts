import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  createTodo(@Body() body: any) {
    return this.todoService.createTodo(body);
  }

  @Put(':id')
  editTodo(@Param('id') id: number, @Body() body: any) {
    return this.todoService.editTodo(id, body);
  }

  @Put('isCompleted/:id')
  isCompleted(@Param('id') id: number) {
    return this.todoService.isCompleted(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
}
