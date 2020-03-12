import {NgModule} from '@angular/core';
import {ToCartModalService} from './services/toCartModal.service';
import {ToCartModalComponent} from './services/toCartModal.component';


@NgModule({
    declarations: [ToCartModalComponent],
    providers: [ToCartModalService],
    exports: [ToCartModalComponent]
})
export class CommonAppModule {
}
