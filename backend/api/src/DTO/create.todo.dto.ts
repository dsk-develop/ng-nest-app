
import { Transformer } from "stream/web";
 import { TodoStatus } from "src/Entity/todo.entity";
import { IsNotEmpty, MaxLength } from "class-validator/types/decorator/decorators";
export class CreateTodoDto {

    @IsNotEmpty()
    @MaxLength(15, { message: 'Max length is 15 characters' })
    title: string;

    @IsNotEmpty()
    description: string;

    
    @IsNotEmpty()
    status: TodoStatus;

}