import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ModelModule} from '../../model/model.module';
import {HttpClientModule} from '@angular/common/http';
import {ShopComponent} from './shop.component';
import {OneProductComponent} from './one-product/one-product.component';
import {RouterModule} from '@angular/router';
import {OrderByPipe} from '../../common/pipes/order-by.pipe';
import {RightCardsComponent} from './right-cards/right-cards.component';
import {CommonAppModule} from '../../common/common-app.module';
import {MatProgressSpinnerModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {CheckoutComponent} from './checkout/checkout.component';
import {CartComponent} from './cart/cart.component';
import {CartSummaryComponent} from '../../header/cart-summary/cart-summary.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    imports: [BrowserModule,
        ModelModule, HttpClientModule,
        RouterModule, CommonAppModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        NgxMaskModule.forRoot(options)
    ],
    declarations: [
        ShopComponent, OneProductComponent, OrderByPipe, RightCardsComponent, CheckoutComponent, CartComponent,
        CartSummaryComponent
    ],
    exports: [NgxMaskModule, CartComponent, CartSummaryComponent]
})
export class ShopModule {
}
