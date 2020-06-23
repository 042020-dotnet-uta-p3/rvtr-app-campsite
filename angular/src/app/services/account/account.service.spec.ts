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

  describe('getUserId', () => {
    it('should return userId', () => {
      const id = service.getUserId();
      expect(id).toBe('1');
    });
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

  describe ('getPayment', () => {
    it('should make httpGet request', fakeAsync(() => {
      let req: TestRequest;
      service.getPayment('0').subscribe((res) => {
        expect(res.length).toEqual(accountMock.length);
      });

      tick();

      req = httpTestingController.expectOne('paymentTest?accountId=0');
      req.flush(accountMock);
    }));
  });

  describe ('getProfile', () => {
    it('should make httpGet request', fakeAsync(() => {
      let req: TestRequest;
      service.getProfile('0').subscribe((res) => {
        expect(res.length).toEqual(accountMock.length);
      });

      tick();

      req = httpTestingController.expectOne('profileTest?accountId=0');
      req.flush(accountMock);
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

  describe('postPayment', () => {
    it('should make httpPost request', fakeAsync(() => {
      let req: TestRequest;

      service.postPayment(null).subscribe((res) => {
        expect(JSON.parse(res.toString())).toBeTrue();
      });

      tick();

      req = httpTestingController.expectOne('paymentTest');
      req.flush(JSON.stringify(true));
    }));
  });

  describe('postProfile', () => {
    it('should make httpPost request', fakeAsync(() => {
      let req: TestRequest;

      service.postProfile(null).subscribe((res) => {
        expect(JSON.parse(res.toString())).toBeTrue();
      });

      tick();

      req = httpTestingController.expectOne('profileTest');
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

  describe('validateImage', () => {
    
  });

  describe('isValidCreditCard', () => {
    it('should allow a valid Visa card number', () => {
      const returnValue = service.isValidCreditCard('4325487844929025');
      expect(returnValue).toBeTrue();
    });
    it('should allow a valid MC card number', () => {
      const returnValue = service.isValidCreditCard('5474572265494504');
      expect(returnValue).toBeTrue();
    });
    it('should allow a valid Discover card number', () => {
      const returnValue = service.isValidCreditCard('6011742194273331');
      expect(returnValue).toBeTrue();
    });
    it('should allow a valid AE card number', () => {
      const returnValue = service.isValidCreditCard('342762285935732');
      expect(returnValue).toBeTrue();
    });
    it('should not allow a card number > 16 digits', () => {
      const returnValue = service.isValidCreditCard('11111111111111111');
      expect(returnValue).toBeFalse();
    });
    it('should not allow a card number < 13 digits', () => {
      const returnValue = service.isValidCreditCard('11111111');
      expect(returnValue).toBeFalse();
    });
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
