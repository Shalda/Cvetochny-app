import {NgModule} from '@angular/core';
import {ImageAdminDirective} from './directives/image-admin.directive';
import {ImgLinkDirective} from './directives/img-link.directive';

@NgModule({

    declarations: [ImageAdminDirective, ImgLinkDirective],
    exports:  [ImageAdminDirective, ImgLinkDirective]
})
export class CommonAppModule {
}
