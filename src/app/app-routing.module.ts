import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, isAdmin, isLogined } from './Auth/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { BookdetailsComponent } from './pages/bookdetails/bookdetails.component';
import { CartinfoComponent } from './pages/cartinfo/cartinfo.component';
import { HistorypayComponent } from './pages/historypay/historypay.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'product', component:ProductComponent },
  { path:'login', component:SigninComponent, canActivate:[isLogined]},
  { path:'profile', component:ProfileComponent, canActivate:[AuthGuard] },
  { path:'signup', component:SignupComponent, canActivate:[isLogined] },
  { path:'admin', component:AdminComponent, canActivate:[isAdmin] },
  { path:'detail/:id', component:BookdetailsComponent },
  { path:'cart', component:CartinfoComponent },
  { path:'history-pay', component:HistorypayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
