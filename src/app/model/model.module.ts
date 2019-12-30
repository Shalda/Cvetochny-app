import {NgModule} from '@angular/core';
import {P} from '@angular/core/src/render3';
import {HttpClientModule} from '@angular/common/http';
import {RestDataSource} from './rest.datasource';
import {ProductRepository} from './product.repository';
import {VisualModelResolver} from './visual.resolver';
import {AuthService} from './auth.service';
import {SendEmailService} from './send-email.service';


@NgModule({
    imports: [HttpClientModule],
    providers: [RestDataSource, ProductRepository, VisualModelResolver, AuthService, SendEmailService],
})
export class ModelModule {
}
