import {NgModule} from '@angular/core';
import {ToggleSubmenuDirective} from './directives/toogle-submenu.directive';

@NgModule({

    declarations: [ToggleSubmenuDirective],
    exports: [ToggleSubmenuDirective]
})
export class CommonAppModule {
}
