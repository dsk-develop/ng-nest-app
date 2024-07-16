import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { TodoStatus } from "src/Entity/todo.entity";

export declare class TodoStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: TodoStatus[];
    allowedStatus: any;
    transform(value: any, metadata: ArgumentMetadata): any;
    private isStatusValid;
}
