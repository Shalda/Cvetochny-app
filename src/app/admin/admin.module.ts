import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AdminComponent} from './admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './auth.guard';
import {ProductEditorComponent} from './productEditor.component';
import {ProductTableComponent} from './productTable.component';
import {CommonAppModule} from '../common/common-app.module';
import {VisualEditorComponent} from './visualEditor.component';
import {
    MatButtonModule, MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatRadioModule,
    MatSelectModule
} from '@angular/material';
import {SignComponent} from './login.component';



const routing = RouterModule.forChild([
    {path: 'auth', component: AuthComponent},
    /*need to delete*/ {path: 'reg', component: SignComponent},
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
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        CommonAppModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule
    ],
    providers: [AuthGuard],
    declarations: [
        AuthComponent,
        AdminComponent,
        ProductTableComponent,
        ProductEditorComponent,
        VisualEditorComponent,
        SignComponent]
})
export class AdminModule {
}
