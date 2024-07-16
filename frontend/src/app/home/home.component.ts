import { Component } from '@angular/core';
import {FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

interface TodoItem {
  id: number;
  title: string;
  status: string;
  description: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedStatus: string = '';
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  todos: any;
  editForm: FormGroup;
  todoId: any;
  
  statuses = [
    { value: 'OPEN', label: 'Open' },
    { value: 'CLOSED', label: 'Closed' },
    { value: 'WIP', label: 'Work in Progress' }
  ];
  isNewTodo: boolean = true;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.editForm = this.fb.group({
    title: [''],
    description: [''],
    status: ['']
  });}
  title: string = '';
  description: string = '';
  status: any[] = [
    {value: 'OPEN', label: 'OPEN'},
    {value: 'CLOSED', label: 'CLOSED'},
    {value: 'WIP', label: 'WIP'}
  ];
  ngOnInit(){
    this.listTodos();
    // this.todoId = this.router.snapshot.paramMap.get('id');
    // this.loadTodoDetails();
  }
  logItemId(itemId: number, title: string = '', description: string = '') {
    console.log('Item ID:', itemId,title,description);
  }
  
  loadTodoDetails() {
    this.apiService.getTodoById(this.todoId).subscribe(todo => {
      this.editForm.patchValue({
        title: todo.title,
        description: todo.description,
        status: todo.status
      });
    });
  }
  //create todo
  createTodo(): void {
    this.apiService.createToDo({title: this.title, description: this.description, status: this.status}).subscribe(
      (response: any) => {
        console.log(response);
        
        this.toastr.success('TODO created successfully!', 'Success');
        // this.router.navigate(['/']);
        this.router.navigateByUrl('/').then();
      },
      (error: any) => {
        console.log(error);
        
        console.error('Failed to create TODO:', error);
        this.toastr.error('Failed to create TODO. Please try again.', 'Error');
      }
    );
  }
  // edit todo
  updateTodo() {
    if (this.editForm.valid) {
      const data = this.editForm.value;
  
      this.apiService.updateToDo(this.todoId, data).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success('TODO updated successfully!', 'Success');
          this.router.navigateByUrl('/').then;
        },
        (error: any) => {
          console.error('Failed to update TODO:', error);
          this.toastr.error('Failed to update TODO. Please try again.', 'Error');
        }
      );
    }
  }
  
  onDelete(todoId: string) {
    if (confirm('Are you sure you want to delete this TODO item?')) {
      this.apiService.deleteToDo(todoId).subscribe(
        (response) => {
          console.log('TODO item deleted successfully', response);
          this.todos = this.todos.filter((todo: { id: string; }) => todo.id !== todoId);
        },
        (error) => {
          console.error('Error deleting TODO item', error);
        }
      );
    }
  }

  listTodos(): void {
    this.apiService.listToDos().subscribe(
      (response: any) => {
        // console.log(response);
        this.todos = response; 
      },
      (error: any) => {
        this.toastr.error('Failed to fetch TODOs. Please try again.', 'Error');
      }
    );
  }  
  openCreateTodoForm(data:any): void {
    this.showCreateForm = !this.showCreateForm;
    this.showEditForm = false;
  console.log(data);
  if(data?.id){
    this.title = data.title
    this.status = data.status
    this.description = data.description
  }
    this.showCreateForm = true;
  }

  closeCreateTodoForm(): void {
    this.showCreateForm = false;
  }
  // items: TodoItem[] = [
  //   { id: 1, title: 'Task 1', status: 'open', description:'Lorem Ipsum jgjhfu tyeyweuyu rtwfggd erterere..' },
  //   { id: 2, title: 'Task 2', status: 'closed', description:'Testing ..'  },
  // ];
  // filteredItems: TodoItem[] = [...this.items];
   // Status Filter 
  //  filterRecords(): void {
  //   if (this.selectedStatus) {
  //     this.filteredItems = this.items.filter(item => item.status === this.selectedStatus);
  //   } else {
  //     this.filteredItems = [...this.items];
  //   }
  // }


}
