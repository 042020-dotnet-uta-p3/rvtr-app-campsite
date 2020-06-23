import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/data/booking.model';
import { AccountService } from 'src/app/services/account/account.service';
import { map } from 'rxjs/operators';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { AccountBooking } from 'src/app/data/accountBooking';
import { HttpParams } from '@angular/common/http';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'uic-display-bookings',
  templateUrl: './display-bookings.component.html',
  styleUrls: ['./display-bookings.component.scss']
})
export class DisplayBookingsComponent implements OnInit {

  // properties
  bookings: AccountBooking[];

  // functions
  // http get to call the most 2 recent bookings and related lodging information from the booking service.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard.
  // Bookings will be sorted on the API end. using account id.
  getBookings() {
   this.bookingService.get(undefined, new HttpParams().set('sort', 'id desc')
   .set('accountId', this.accountService.getUserId()).set('limit', '2'))
     .subscribe(resultBookings => {
       this.bookings = resultBookings;
       this.bookings.forEach(booking =>
         this.lodgingService.get(booking.lodgingId.toString(), new HttpParams().set('IncludeImages', true.toString()))
                            .subscribe((lodging: any) =>
                               booking.lodging = lodging));
     });
  }

  constructor(
    private readonly accountService: AccountService,
    private readonly lodgingService: LodgingService,
    private readonly bookingService: BookingService
    ) { }

  ngOnInit(): void {
    this.getBookings();
  }

}
