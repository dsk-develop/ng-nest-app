import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/DTO/create.todo.dto';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { DeleteResult, Repository } from 'typeorm';
@Injectable()
export class TodoService {
  update(id: number, status: TodoStatus) {
    throw new Error('Method not implemented.');
  }
  updateTodo(id: number, status: TodoStatus): TodoEntity | PromiseLike<TodoEntity> {
    throw new Error('Method not implemented.');
  }
  
   constructor(
      @InjectRepository(TodoEntity)
      private readonly repo: Repository<TodoEntity>,
    ) {}

    async getAllTodos():Promise<TodoEntity[]> {
        return await this.repo.find();
    }
    async createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const { title, description, status } = createTodoDto;
        const newTodo = new TodoEntity();
        newTodo.title = title;
        newTodo.description = description;
        newTodo.status = status;
        await this.repo.save(newTodo);
        return newTodo;
      }
     
async todoUpdate(id: number, status: TodoStatus): Promise<TodoEntity> {
  const todo = await this.repo.findOneBy({id});
  if (!todo) {
    throw new NotFoundException(`Todo with id ${id} not found`);
  }

  todo.status = status;
  await this.repo.save(todo);
  return todo;
}

  async todoDelete(id: number):Promise<DeleteResult> {
    try {
      return await this.repo.delete({id});
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}

export { CreateTodoDto };
