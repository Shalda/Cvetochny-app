import {Directive, HostBinding, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Product} from '../../model/product.model';

@Directive({
    selector: '[appImageAdmin]'
})
export class ImageAdminDirective implements OnInit {

    @Input('appImageAdmin')
    @HostBinding('textContent')
    imgText: any;
    @Input('appProductImage')
    productImg: any;

    ngOnInit() {
        if (!this.productImg) {
            this.imgText = 'None';
        } else {
            if (Array.isArray(this.productImg)) {
                this.imgText = this.productImg.map(i => i.slice(i.lastIndexOf('/') + 1)).join('; ')
                ;
            } else {
                this.imgText = this.productImg;
            }
        }
    }
}
