import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SendEmailService} from '../model/send-email.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    public class = false;
    public loading = false;
    public buttonText = 'Отправить';
    public username: string;
    public email: string;
    public message: string;
    public phonenumber: number;
    constructor( private _sendService: SendEmailService) {
    }

    public modalSwitcher(): void {
        this.class = !this.class;
    }

    sendEmail(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail(this.username, this.phonenumber, null, null, this.email, this.message).subscribe(
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

    ngOnInit() {
    }

}
