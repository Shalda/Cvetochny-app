import {Component, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import {ToCartModalService} from './toCartModal.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cart-modal',
    template:
            `
        <div class="to-cart-modal">
            <div class="to-cart-modal-body">
                <div class="to-cart-modal-text">
                <ng-content></ng-content>
                <span> добавлен в корзину</span>
                </div>
                <div class="to-cart-modal-buttons-box">
                    <button type="submit" class="cart-button" (click)="close()">
                        Продолжить покупки
                    </button>
                    <button type="submit" class="cart-button orange_btn" (click)="navToCart()" >
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
        <div class="to-cart-modal-background"></div>`
})

export class ToCartModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ToCartModalService, private el: ElementRef, private _router: Router) {
        this.element = el.nativeElement;
    }
    public navToCart() {
        this.close();
        this._router.navigateByUrl('category/cart');
    }
    ngOnInit(): void {
        const modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'to-cart-modal') {
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('to-cart-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('to-cart-modal-open');
    }
}
