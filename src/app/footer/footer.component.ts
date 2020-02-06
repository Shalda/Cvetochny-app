import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SendEmailService} from '../model/send-email.service';
import {RestDataSource} from '../model/rest.datasource';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    public class = false;
    public loading = false;
    public messageSent = false;
    public buttonText = 'Отправить';
    public username: string;
    public email: string;
    public message: string;
    public phonenumber: number;
    constructor( private _sendService: SendEmailService, private _restData: RestDataSource) {
    }

    public modalSwitcher(): void {
        this.buttonText = 'Отправить';
        this.messageSent = false;
        this.class = !this.class;
    }
    public sendSMS() {
        this._restData.sendSMS('на консультацию');
    }

    sendEmail(form: NgForm) {
        this.sendSMS();
        this.loading = true;
        if (form.valid) {
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail('' , this.username, this.phonenumber, null, null, this.email, this.message).subscribe(
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
                    this.messageSent = true;
                    this.buttonText = 'Отправлено';
                    form.reset();
                }
            );
        }
    }

    ngOnInit() {
    }

}
