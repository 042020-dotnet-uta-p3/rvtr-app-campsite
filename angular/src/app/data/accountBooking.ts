import { Booking } from './booking.model';
import { Lodging } from './lodging.model';

export interface AccountBooking extends Booking{
    lodging?: Lodging;
}
