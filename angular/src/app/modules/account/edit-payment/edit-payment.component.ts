import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Payment } from './../../../data/payment.model';
import { AccountService } from './../../../services/account/account.service';

@Component({
  selector: 'uic-edit-payment',
  templateUrl: './edit-payment.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})

export class EditPaymentComponent implements OnInit {
  // properties
  hideCard = true;
  cards: Payment[];
  newCard: Payment = {
    id: 0,
    accountId: Number(this.accountService.getUserId()),
    cardName: '',
    cardNumber: null,
    cardExpirationDate: null
  };

  // boolean toggle to show/hide the add new payment section in html
  toggleCard() {
    this.hideCard = !this.hideCard;
  }

  // adds a new credit card info to the array of payments in the data:Account property
  addCard() {
    const today = new Date();
    if (this.accountService.isNullOrWhitespace(this.newCard.cardName) ||
      today > this.newCard.cardExpirationDate ||
      !this.accountService.isValidCreditCard(this.newCard.cardNumber)) {
      console.log('Error, please try again');
    } else {
      this.accountService.postPayment(this.newCard).subscribe(payment => {
        this.getPayment();
        this.toggleCard();
        alert('added!');
      });
    }
  }

  // remove a payment card from arrays of payments in the data:Account property
  removeCard(cardId: number) {
    this.accountService.deletePayment(cardId).subscribe(payment =>
      this.getPayment()
    );
  }
  // get payment information from the payment api
  getPayment() {
    this.accountService.getPayment(this.accountService.getUserId()).subscribe(
      payments => this.cards = payments
    );
  }

  constructor(private readonly accountService: AccountService) { }

  ngOnInit(): void {
    this.getPayment();
  }
}
