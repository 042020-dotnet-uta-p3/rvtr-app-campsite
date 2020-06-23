import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
import { AccountService } from './account.service';
import { ConfigService } from '../config/config.service';
import { Account } from '../../data/account.model';
import { Config } from '../../data/config.model';

describe('AccountService', () => {
  const accountMock: Account[] = [
    {
      id: '1',
      address: null,
      name: '',
      payments: null,
      profiles: null,
    },
  ];

  const configServiceStub = {
    get() {
      const config: Config = {
        api: {
          account: {
            base: '',
            uri: {
              account: 'accountTest',
              payment: 'paymentTest',
              profile: 'profileTest'
            }
          },
          booking: null,
          lodging: null,
          monitoring: null,
        },
        navigation: null,
      };

      return scheduled([config], asyncScheduler);
    },
  };

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('delete', () => {
    it('should make httpDelete request', fakeAsync(() => {
      let req: TestRequest;

      service.delete('0').subscribe((res) => {
        expect(JSON.parse(res.toString())).toBeTrue();
      });

      tick();

      req = httpTestingController.expectOne('accountTest/0');
      req.flush(JSON.stringify(true));
    }));
  });

  describe('get', () => {

    it('should get all accounts', fakeAsync(() => {
      let req: TestRequest;
      service.get().subscribe((res) => {
        expect(res.length).toEqual(accountMock.length);
      });

      tick();

      req = httpTestingController.expectOne('accountTest');
      req.flush(accountMock);
    }));

    it('should get correct account id', fakeAsync(() => {
      let reqOne: TestRequest;

      service.get('0').subscribe((res) => {
        expect(res[0].id).toEqual(accountMock[0].id);
      });

      tick();

      reqOne = httpTestingController.expectOne('accountTest?id=0');
      reqOne.flush(accountMock);
    }));
  });

  describe('post', () => {
    it('should make httpPost request', fakeAsync(() => {
      let req: TestRequest;

      service.post(accountMock[0]).subscribe((res) => {
        expect(JSON.parse(res.toString())).toBeTrue();
      });

      tick();

      req = httpTestingController.expectOne('accountTest');
      req.flush(JSON.stringify(true));
    }));
  });

  describe('put', () => {
    it('should make httpPut request', fakeAsync(() => {
      let req: TestRequest;

      service.put(accountMock[0]).subscribe((res) => {
        expect(res).toEqual(accountMock[0]);
      });

      tick();

      req = httpTestingController.expectOne('accountTest');
      req.flush(accountMock[0]);
    }));
  });

  describe('deletePayment', () => {
    it('should make httpDelete request', fakeAsync(() => {
      let req: TestRequest;

      service.deletePayment(0).subscribe((res) => {
        expect(JSON.parse(res.toString())).toBeTrue();
      });

      tick();

      req = httpTestingController.expectOne('paymentTest/0');
      req.flush(JSON.stringify(true));
    }));
  });
  
  describe('deleteProfile', () => {
    it('should make httpDelete request', fakeAsync(() => {
      let req: TestRequest;

      service.deleteProfile(0).subscribe((res) => {
        expect(JSON.parse(res.toString())).toBeTrue();
      });

      tick();

      req = httpTestingController.expectOne('profileTest/0');
      req.flush(JSON.stringify(true));
    }));
  });

  describe('isNullOrWhitespace', () => {
    it('should return true on null string', () => {

      expect(service.isNullOrWhitespace(null)).toBeTrue();
    });
    it('should return true on empty string', () => {

      expect(service.isNullOrWhitespace('')).toBeTrue();
    });
    it('should return true on string of spaces string', () => {

      expect(service.isNullOrWhitespace('  ')).toBeTrue();
    });
    it('should return false on non null/emtpy string', () => {

      expect(service.isNullOrWhitespace('null')).toBeFalse();
    });
  });
});
