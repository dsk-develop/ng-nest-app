import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-todoedit',
  templateUrl: './todoedit.component.html',
  styleUrls: ['./todoedit.component.css']
})
export class TodoeditComponent {
  title!: string;
  description!: string;
  
  showEditForm: boolean = false;
  editForm!: FormGroup;
  itemId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.itemId = +params['id'];
    });

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.title = queryParams['title'];
      this.description = queryParams['description'];
    });
  }
  

  onSave(): void {
    if (this.editForm.valid) {
      // if (this.itemId) {
        console.log(this.itemId);
        this.apiService.updateToDo(this.itemId, this.editForm.value).subscribe(() => {
          this.router.navigate(['/todos']);
        });
      // } else {
      //   this.apiService.createToDo(this.editForm.value).subscribe(() => {
      //     this.router.navigate(['/todos']);
      //   });
      // }
    }
  }
  openCreateTodoForm(): void {
    this.showEditForm = true;
  }

  closeCreateTodoForm(): void {
    this.showEditForm = false;
  }
}
