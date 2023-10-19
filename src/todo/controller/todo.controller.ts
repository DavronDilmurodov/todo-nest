import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  editTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Res() res: Response,
  ) {
    return this.todoService.editTodo(id, body, res);
  }

  @Put('isCompleted/:id')
  isCompleted(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return this.todoService.isCompleted(id, res);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return this.todoService.deleteTodo(id, res);
  }
}
