import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { GenerateTokenComponent } from './components/generate-token/generate-token.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  // other routes

  // { path: 'generate-token', component: GenerateTokenComponent },
  { path: 'login', component: LoginPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

