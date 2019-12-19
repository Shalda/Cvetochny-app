import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    public class: boolean = false;

    constructor() {
    }

    public modalSwitcger(): void {
        if (!this.class) {
            this.class = true;
        } else {
            this.class = false;
        }
    }

    ngOnInit() {
    }

}
