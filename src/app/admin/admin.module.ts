import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AdminComponent} from './admin.component';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import {ProductEditorComponent} from './productEditor.component';
import {ProductTableComponent} from './productTable.component';
import {CommonAppModule} from '../common/common-app.module';
import {VisualEditorComponent} from './visualEditor.component';

let routing = RouterModule.forChild([
    {path: 'auth', component: AuthComponent},
    {
        path: 'main', component: AdminComponent, canActivate: [AuthGuard],
        children: [
            {path: 'products/:mode/:id', component: ProductEditorComponent},
            {path: 'products/:mode', component: ProductEditorComponent},
            {path: 'products', component: ProductTableComponent},
            {path: 'visuals/:mode/:id', component: VisualEditorComponent},
            {path: 'visuals/:mode', component: VisualEditorComponent},
            {path: 'visuals', component: ProductTableComponent},
            {path: '**', redirectTo: 'products'}
        ]
    },
    {path: '**', redirectTo: 'auth'}
]);

@NgModule({
    imports: [
        CommonModule, FormsModule, routing, CommonAppModule
    ],
    providers: [AuthGuard],
    declarations: [AuthComponent, AdminComponent, ProductTableComponent, ProductEditorComponent, VisualEditorComponent]
})
export class AdminModule {
}
