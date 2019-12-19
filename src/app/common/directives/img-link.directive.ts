import {Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[appImgLink]'
})
export class ImgLinkDirective implements OnInit {
    @Input('appImageAdmin')
    @HostBinding('src')
    imgLink: any;
    @Input('appImgLink')
    imgName: string;
    @Input('appImageCategory')
    imgCat: string;

    ngOnInit() {
        if (!this.imgName || !this.imgCat) {
            this.imgLink = '';
        } else {
            this.imgLink = `/assets/images/${this.imgCat}/${this.imgName}`;
        }
    }
}
