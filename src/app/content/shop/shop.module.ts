import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ModelModule} from '../../model/model.module';
import {HttpClientModule} from '@angular/common/http';
import {ShopComponent} from './shop.component';
import {OneProductComponent} from './one-product/one-product.component';
import { RouterModule} from '@angular/router';
import {OrderByPipe} from '../../common/pipes/order-by.pipe';
import {RightCardsComponent} from './right-cards/right-cards.component';
import {CommonAppModule} from '../../common/common-app.module';

@NgModule({
    imports: [BrowserModule, ModelModule, HttpClientModule, RouterModule, CommonAppModule
    ],
    declarations: [
        ShopComponent, OneProductComponent, OrderByPipe, RightCardsComponent
    ],
})
export class ShopModule {
}
