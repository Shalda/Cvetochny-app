import {BrowserModule} from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {ProductRepository} from './model/product.repository';
import {RestDataSource} from './model/rest.datasource';
import {ModelModule} from './model/model.module';
import {ShopModule} from './content/shop/shop.module';
import {VisualComponent} from './content/visual/visual.component';
import {ContactComponent} from './content/contact/contact.component';
import {GalleryModule} from '@ngx-gallery/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {CooperationComponent} from './content/cooperation/cooperation.component';
import {AboutComponent} from './content/about/about.component';
import {DeliveryComponent} from './content/delivery/delivery.component';
import {CommonAppModule} from './common/common-app.module';
import {AuthInterceptor} from './admin/auth-interseptor';
import {AuthService} from './model/auth.service';
import {FormsModule} from '@angular/forms';





@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        VisualComponent,
        FooterComponent,
        MainComponent,
        ContactComponent,
        CooperationComponent,
        AboutComponent,
        DeliveryComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ModelModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes),
        ShopModule,
        GalleryModule.withConfig({
            loadingMode: 'indeterminate',
            thumbMode: 'free',
            thumbPosition: 'bottom',
            imageSize: 'cover'
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA5xKkA8Df4hBmqTbhNzTgbVPkWE7Y2b4o'
        }),
        CommonAppModule,
    ],
    providers: [ProductRepository, RestDataSource, [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]],
    bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
    constructor(private _auth: AuthService) {
    }

    ngOnInit() {
                this._auth.autoAuthUser();
    }
}
