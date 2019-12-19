import {Route} from '@angular/router';
import {ShopComponent} from './content/shop/shop.component';
import {OneProductComponent} from './content/shop/one-product/one-product.component';
import {MainComponent} from './main/main.component';
import {RightCardsComponent} from './content/shop/right-cards/right-cards.component';
import {ContactComponent} from './content/contact/contact.component';
import {VisualComponent} from './content/visual/visual.component';
import {VisualModelResolver} from './model/visual.resolver';
import {AboutComponent} from './content/about/about.component';
import {CooperationComponent} from './content/cooperation/cooperation.component';
import {DeliveryComponent} from './content/delivery/delivery.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: MainComponent
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
    },
    {
        path: 'category/oformlenie',
        component: ShopComponent,
        children: [
            {path: ':category', component: VisualComponent},
            {path: '', component: VisualComponent},
        ],
        resolve: {model: VisualModelResolver}
    },
    {
        path: 'category/contact',
        component: ShopComponent,
        children: [
            {path: '', component: ContactComponent},

        ]
    },
    {
        path: 'category/:parentcategory',
        component: ShopComponent,
        children: [
            {path: 'id/:index', component: OneProductComponent},
            {path: ':category', component: RightCardsComponent},
            {path: ':category/:subcategory', component: RightCardsComponent},
            {path: '', component: RightCardsComponent},
        ]
    },
    {
        path: 'delivery',
        component: DeliveryComponent,
    },
    {
        path: 'about-us',
        component: AboutComponent,
    },
    {
        path: 'cooperation',
        component: CooperationComponent,
    },
    {
        path: '**',
        component: MainComponent
    }
];
