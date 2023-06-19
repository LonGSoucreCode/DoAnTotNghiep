import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BagFormComponent } from './Bag/bag-form/bag-form.component';
import { AccountConnectedserviceComponent } from './Body/Account/account/account-connectedservice/account-connectedservice.component';
import { AccountCreditComponent } from './Body/Account/account/account-credit/account-credit.component';
import { AccountDetailComponent } from './Body/Account/account/account-detail/account-detail.component';
import { AccountOrderandreturnComponent } from './Body/Account/account/account-orderandreturn/account-orderandreturn.component';
import { AccountComponent } from './Body/Account/account/account.component';
import { BodyFormComponent } from './Body/body-form/body-form.component';
import { ProductDetailComponent } from './Body/product-detail/product-detail.component';
import { WishlistFormComponent } from './WishList/wishlist-form/wishlist-form.component';
import { AdminFormComponent } from './Admin/admin-form/admin-form.component';
import { AdminDashboardComponent } from './Admin/admin-form/admin-dashboard/admin-dashboard.component';
import { AdminMystoreComponent } from './Admin/admin-form/admin-mystore/admin-mystore.component';
import { AdminUserComponent } from './Admin/admin-form/admin-user/admin-user.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AdminLoginComponent } from './Admin/admin-form/admin-login/admin-login.component';
import { AdminOrderComponent } from './Admin/admin-form/admin-order/admin-order.component';

const routes: Routes = [

  {
    path:'',
    component: BodyFormComponent
  },
  {
    path:'Home',
    component: BodyFormComponent
  },
  {
    path:'Search',
    component: SearchFormComponent
  },
  {
    path:'WishList',
    component: WishlistFormComponent,
  },
  {
    path:'product/:name/:id',
    component: ProductDetailComponent
  },
  {
    path:'product/:name/:id/:size',
    component: ProductDetailComponent
  },
  {
    path:'Bag',
    component: BagFormComponent
  },
  {
    path:'Account',
    component: AccountComponent,
    children: [
      {
        path: 'OrderAndReturn',
        component: AccountOrderandreturnComponent
      },
      {
        path: 'ConnectedService',
        component: AccountConnectedserviceComponent
      },
      {
        path: 'Credit',
        component: AccountCreditComponent
      },
      {
        path: 'Detail',
        component: AccountDetailComponent
      }
    ]
  },
  {
    path:'admin',
    component: AdminFormComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'mystore',
        component: AdminMystoreComponent
      },
      {
        path: 'user',
        component: AdminUserComponent
      },
      {
        path: 'order',
        component: AdminOrderComponent
      }
    ]
  },
  {
    path: 'Admin/Login',
    component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
