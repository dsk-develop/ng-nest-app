import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Response } from 'express';
import { Any } from 'typeorm';
import path from 'path';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from 'src/Pipes/TodoStatusValidation.pipe';

@Controller('/api/todos')
export class TodoController {

    constructor(private todoService: TodoService) {}
    @Get()
    getAlltodos() {
        return this.todoService.getAllTodos();
    }

    @Post()
    async createNewToDo(@Body() data: any, @Res() res: Response): Promise<void> {
      try {
        const { title, description, status } = data;
        const uppercaseStatus = status.toUpperCase();
        const newData = { ...data, status: uppercaseStatus };
        const createdTodo: TodoEntity = await this.todoService.createTodo(newData);
  
        res.status(HttpStatus.CREATED).json({
          todo: createdTodo,
          message: 'Todo created successfully',
        });
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to create todo',
          error: error.message,
        });
      }
    }

    @Patch(':id/update-status')
     //@UsePipes(new TodoStatusValidationPipe())
    async update(
      @Param('id') id: number,
      @Body('status') status: TodoStatus,
     
      @Res() res: Response
    ): Promise<void> {
      try {
        const uppercaseStatus = status;
        const newData = {  status: uppercaseStatus };
        const todoUpdate: TodoEntity = await this.todoService.todoUpdate(id, status);
        res.status(HttpStatus.OK).json({
          todo: todoUpdate,
          message: 'Todo updated successfully',
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          res.status(HttpStatus.NOT_FOUND).json({
            message: error.message,
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to update todo',
            error: error.message,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          });
        }
      }
    }
  @Delete(':id')
    deleteTodo(@Param('id') id: number) {
      return this.todoService.todoDelete(id);
    }
}
