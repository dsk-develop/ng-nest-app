import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  editForm: FormGroup;
  todos: any;
  todoId: any;
  statuses = [
    { value: 'OPEN', label: 'Open' },
    { value: 'CLOSED', label: 'Closed' },
    { value: 'WIP', label: 'Work in Progress' }
  ];
  formData = {
    id: '',
    title: '',
    description: '',
    status: ''
  };
  currentTodoId: number | null = null;
  showForm = false;
  editMode = false;
  filteredTodos: any[] = []; 
  statusFilterControl = new FormControl('');
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({ title: [''], description: [''], status: [''] });
  }
  ngOnInit() {
    this.listTodos();
    this.statusFilterControl.valueChanges.subscribe(() => {
      this.filterTodos();
    });
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
    this.apiService.listToDos().subscribe((response: any) => {
        this.todos = response;
        this.filterTodos();
      },
      (error: any) => {
        this.toastr.error('Failed to fetch TODOs. Please try again.', 'Error');
      }
    ); 
  } 

  filterTodos() {
    const selectedStatus = this.statusFilterControl.value;
    if (selectedStatus) {
      this.filteredTodos = this.todos.filter((todo: { status: string; }) => todo.status === selectedStatus);
    } else {
      this.filteredTodos = this.todos;
    }
  }

  openCreateForm() {
    this.showForm = true;
    this.resetForm();
  }

  openEditForm(todo: { id: string; title: any; description: any; status: any; }) {
    this.editMode = true;
    this.showForm = true;
    this.currentTodoId = parseInt(todo.id, 10);
    this.formData = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status
    };
  }
  resetForm() {
    this.formData = {
      id: '',
      title: '',
      description: '',
      status: ''
    };
  }
  closeForm() {
    this.showForm = false;
    this.resetForm();
  }

  handleSubmit() {
    const { id, title, description, status } = this.formData;
    if (this.editMode && this.currentTodoId !== null) {
      // Updating Todo
      const todoId = this.currentTodoId;
      console.log('ID:', todoId);
      const body = { id: todoId, title, description, status };
      this.apiService.updateToDo(todoId, body).subscribe(
        (response: any) => {
          console.log('TODO updated successfully', response);
          this.closeForm();
        },
        (error: any) => {
          console.error('Failed to update TODO', error);
        }
      );
    } else {
      // Create new TODO
      const body = { title, description, status };
      this.apiService.createToDo(body).subscribe(
        (response: any) => {
          console.log('TODO created successfully', response);
          this.closeForm();
          this.router.navigateByUrl('/').then();
        },
        (error: any) => {
          console.error('Failed to create TODO', error);
        }
      );
    }
  }
}
