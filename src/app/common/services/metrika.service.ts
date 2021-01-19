import {Injectable} from '@angular/core';
import {Metrika} from 'ng-yandex-metrika';

declare let gtag: Function;
// declare let yaCounter60702883;

@Injectable()
export class MetrikaService {
    constructor(
        // private yMetrika: Metrika
    ) {
    }

    public metrika(value) {
        // this.yMetrika.fireEvent(value);
       // yaCounter60702883.reachGoal(value);
        gtag('event', 'sendemail', {'event_category': value, 'event_action': 'send'});
    }
}
