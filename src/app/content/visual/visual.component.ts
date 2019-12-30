import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductRepository} from '../../model/product.repository';
import {ActivatedRoute} from '@angular/router';
import {Visual} from '../../model/product.model';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {SendEmailService} from '../../model/send-email.service';

@Component({
    selector: 'app-view',
    templateUrl: './visual.component.html',
    styleUrls: ['./visual.component.css']

})
export class VisualComponent {
    public selectedCategory: string;
    public visual: Visual;
    public images$: Observable<GalleryItem[]>;
    slides: GalleryItem[];
    public class: boolean = false;

    constructor(private _sendService: SendEmailService, private _repository: ProductRepository, private _activeRoute: ActivatedRoute) {
        _activeRoute.pathFromRoot.forEach(route => route.params.subscribe(params => {
            if (params['category']) {
                this.selectedCategory = params['category'];
            }
            this.getVisual();
            if (this.visual) {
                this.images$ = of((this.visual.img).map(res => new ImageItem({
                    src: res,
                    thumb: res
                })));
            }
        }));
    }

    public loading = false;
    public buttonText = 'Отправить';
    public username: string;
    public phonenumber: number;
    sendEmail(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail(this.username, this.phonenumber, this.visual._id, this.visual.name).subscribe(
                data => {
                    const res: any = data;
                    console.log(
                        `mail has been sent`
                    );
                },
                err => {
                    console.log(err);
                    this.loading = false;
                    this.buttonText = 'Произошла ошибка при отправке, попробуйте позже';
                }, () => {
                    this.loading = false;
                    this.buttonText = 'Отправлено';
                    form.reset();
                }
            );
        }
    }

    public modalSwitcher(): void {
        this.class = !this.class;
    }

    getVisual(): any {
        this.visual = this._repository.getVisualByCat(this.selectedCategory);
    }
}