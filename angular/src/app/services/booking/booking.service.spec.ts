import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
import { BookingService } from './booking.service';
import { ConfigService } from '../config/config.service';
import { Booking } from '../../data/booking.model';
import { Config } from '../../data/config.model';

describe('BookingService', () => {
  const bookingMock: Booking[] = [
    {
      id: '0',
      accountId: '0',
      lodgingId: '0',
      guests: [],
      bookingRentals: [],
      stay: null,
      status: 'Valid',
    },
  ];

  const configServiceStub = {
    get() {
      const config: Config = {
        api: {
          account: null,
          booking: { booking: 'test', stay: 'test' },
          lodging: null,
          monitoring: null
        },
        navigation: null,
      };

      return scheduled([config], asyncScheduler);
    },
  };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make httpDelete request', fakeAsync(() => {
    let req: TestRequest;

    service.delete('0').subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test/0');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpGet request', fakeAsync(() => {
    let req: TestRequest;
    let reqOne: TestRequest;

    service.get().subscribe((res) => {
      expect(res.length).toEqual(bookingMock.length);
    });

    service.get('0').subscribe((res) => {
      expect(res[0]).toEqual(bookingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test/');
    reqOne = httpTestingController.expectOne('test/0');

    req.flush(bookingMock);
    reqOne.flush(bookingMock);
  }));

  it('should make httpPost request', fakeAsync(() => {
    let req: TestRequest;

    service.post(bookingMock[0]).subscribe((res) => {
      expect(JSON.parse(res.toString())).toBeTrue();
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(JSON.stringify(true));
  }));

  it('should make httpPut request', fakeAsync(() => {
    let req: TestRequest;

    service.put(bookingMock[0]).subscribe((res) => {
      expect(res).toEqual(bookingMock[0]);
    });

    tick();

    req = httpTestingController.expectOne('test');
    req.flush(bookingMock[0]);
  }));
});
