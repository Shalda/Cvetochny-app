import {Component} from '@angular/core';
import {ProductRepository} from '../../model/product.repository';
import {ActivatedRoute} from '@angular/router';
import {Visual} from '../../model/product.model';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {Observable, of} from 'rxjs';
import {NgForm} from '@angular/forms';
import {SendEmailService} from '../../model/send-email.service';
import {RestDataSource} from '../../model/rest.datasource';
import {MetrikaService} from '../../common/services/metrika.service';

declare let gtag: Function;

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
    public messageSent = false;
    public class = false;

    constructor(private _sendService: SendEmailService,
                private _repository: ProductRepository,
                private _activeRoute: ActivatedRoute,
                private _restData: RestDataSource,
                private metrikaService: MetrikaService) {
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

    public sendSms() {
        this._restData.sendSMS('на консультацию');
    }

    public metrika(value) {
        this.metrikaService.metrika(value);
    }

    sendEmail(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            this.metrika('konsult');
            this.sendSms();
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail('visual', this.username, this.phonenumber, this.visual._id, this.visual.name).subscribe(
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
                    this.messageSent = true;
                    form.reset();
                }
            );
        }
    }

    public modalSwitcher(): void {
        this.buttonText = 'Отправить';
        this.messageSent = false;
        this.class = !this.class;
    }

    getVisual(): any {
        this.visual = this._repository.getVisualByCat(this.selectedCategory);
    }
}
