import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyFormComponent } from './Body/body-form/body-form.component';
import { ContactFormComponent } from './Body/contact-form/contact-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './Body/product-detail/product-detail.component';
import { HeaderComponent } from './Header/header.component';
import { ImageProductComponent } from './Body/product/image-product/image-product.component';
import { IconProductComponent } from './Body/product/icon-product/icon-product.component';
import { BrandComponent } from './Body/product/brand/brand.component';
import { WishlistListComponent } from './WishList/wishlist-list/wishlist-list.component';
import { WishlistFormComponent } from './WishList/wishlist-form/wishlist-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './Body/product/product-card/product-card.component';
import { BagFormComponent } from './Bag/bag-form/bag-form.component';
import { ProductBagComponent } from './Body/product/product-bag/product-bag.component';
import { ReputationFormComponent } from './reputation-form/reputation-form.component';
import { ImgProductBagComponent } from './Bag/bag-form/img-product-bag/img-product-bag.component';
import { WishlistBagComponent } from './Bag/bag-form/wishlist-bag/wishlist-bag.component';
import { ProductDetailSizeComponent } from './Body/product-detail/product-detail-size/product-detail-size.component';
import { ProductDetailPriceComponent } from './Body/product-detail/product-detail-size/product-detail-price/product-detail-price.component';
import { ProductDetailSizenumberComponent } from './Body/product-detail/product-detail-size/product-detail-sizenumber/product-detail-sizenumber.component';
import { SizeBagComponent } from './Bag/bag-form/size-bag/size-bag.component';
import { WishlistFormSizeComponent } from './WishList/wishlist-form/wishlist-form-size/wishlist-form-size.component';
import { WishlistFormPriceComponent } from './WishList/wishlist-form/wishlist-form-price/wishlist-form-price.component';
import { WishlistFormBagComponent } from './WishList/wishlist-form/wishlist-form-bag/wishlist-form-bag.component';import { AccountComponent } from './Body/Account/account/account.component';
import { AccountOrderandreturnComponent } from './Body/Account/account/account-orderandreturn/account-orderandreturn.component';
import { AccountConnectedserviceComponent } from './Body/Account/account/account-connectedservice/account-connectedservice.component';
import { AccountCreditComponent } from './Body/Account/account/account-credit/account-credit.component';
import { AccountDetailComponent } from './Body/Account/account/account-detail/account-detail.component';
import { BodyFormSizeComponent } from './Body/body-form/body-form-size/body-form-size.component';
import { FooterComponent } from './footer/footer.component';
import { NeedHelpComponent } from './need-help/need-help.component';
import { ReputationmainFormComponent } from './reputationmain-form/reputationmain-form.component';
import { getCookie, setCookie } from 'typescript-cookie';
import { BillProductlistComponent } from './Body/Account/account/account-orderandreturn/bill-productlist/bill-productlist.component';
import { BillSizeComponent } from './Body/Account/account/account-orderandreturn/bill-productlist/bill-size/bill-size.component';
import { AdminFormComponent } from './Admin/admin-form/admin-form.component';
import { AdminDashboardComponent } from './Admin/admin-form/admin-dashboard/admin-dashboard.component';
import { AdminMystoreComponent } from './Admin/admin-form/admin-mystore/admin-mystore.component';
import { AdminUserComponent } from './Admin/admin-form/admin-user/admin-user.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AdminLoginComponent } from './Admin/admin-form/admin-login/admin-login.component';
import { AdminOrderComponent } from './Admin/admin-form/admin-order/admin-order.component';
import { TestuploadComponent } from './testupload/testupload.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyFormComponent,
    HeaderComponent,
    ContactFormComponent,
    ImageProductComponent,
    ProductDetailComponent,
    IconProductComponent,
    BrandComponent,
    WishlistListComponent,
    WishlistFormComponent,
    LoginFormComponent,
    ProductCardComponent,
    BagFormComponent,
    ProductBagComponent,
    ReputationFormComponent,
    ImgProductBagComponent,
    WishlistBagComponent,
    ProductDetailSizeComponent,
    ProductDetailPriceComponent,
    ProductDetailSizenumberComponent,
    SizeBagComponent,
    WishlistFormSizeComponent,
    WishlistFormPriceComponent,
    WishlistFormBagComponent,
    AccountComponent,
    AccountOrderandreturnComponent,
    AccountConnectedserviceComponent,
    AccountCreditComponent,
    AccountDetailComponent,
    BodyFormSizeComponent,
    FooterComponent,
    NeedHelpComponent,
    ReputationmainFormComponent,
    BillProductlistComponent,
    BillSizeComponent,
    AdminFormComponent,
    AdminDashboardComponent,
    AdminMystoreComponent,
    AdminUserComponent,
    SearchFormComponent,
    AdminLoginComponent,
    AdminOrderComponent,
    TestuploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
