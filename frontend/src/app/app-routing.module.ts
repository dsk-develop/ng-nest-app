import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TodoeditComponent } from "./todoedit/todoedit.component";

const routes: Routes = [
    { path: 'todos/edit/:id', component: TodoeditComponent },
    {
        path:'',
        component:HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    // wildcard route will redirect to home component OR Unknown components
    {
        path: '**',
        pathMatch:'full',
        redirectTo:'' 
    },
    { 
        path: 'edit/:id', 
        component: TodoeditComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabledBlocking'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }