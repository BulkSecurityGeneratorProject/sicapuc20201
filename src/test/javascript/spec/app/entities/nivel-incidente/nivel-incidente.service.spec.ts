/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { NivelIncidenteService } from 'app/entities/nivel-incidente/nivel-incidente.service';
import { INivelIncidente, NivelIncidente } from 'app/shared/model/nivel-incidente.model';

describe('Service Tests', () => {
  describe('NivelIncidente Service', () => {
    let injector: TestBed;
    let service: NivelIncidenteService;
    let httpMock: HttpTestingController;
    let elemDefault: INivelIncidente;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NivelIncidenteService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NivelIncidente(0, 'AAAAAAA', false, false, false, false, false, false);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a NivelIncidente', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new NivelIncidente(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a NivelIncidente', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            notificaDNPM: true,
            notificaEmail: true,
            notificacaoSms: true,
            notificacaoWhatsapp: true,
            notificacaoDispositivoSeguranca: true,
            notificaSirene: true
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of NivelIncidente', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            notificaDNPM: true,
            notificaEmail: true,
            notificacaoSms: true,
            notificacaoWhatsapp: true,
            notificacaoDispositivoSeguranca: true,
            notificaSirene: true
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NivelIncidente', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
