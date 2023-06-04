import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import { ClientModel } from '../model/client-model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ClientsService', () => {
  let service: ClientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientsService]
    });
    service = TestBed.inject(ClientsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve clients', () => {
    const mockClients: ClientModel[] = [
      { sharedKey: 'key1', name: 'Client 1',phone:123123,email:'prueba@gamil.com',startDate:'2023-01-01',endDate:'2023-12-31' }
    ];

    service.getClients().subscribe(clients => {
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne('http://localhost:8080/users/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });

  it('should retrieve client by shared key', () => {
    const mockClient: ClientModel = { sharedKey: 'key1', name: 'Client 1',phone:123123,email:'prueba@gamil.com',startDate:'2023-01-01',endDate:'2023-12-31' }
    const sharedKey = 'key1';

    service.getClientsBySharedKey(sharedKey).subscribe(client => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne(`http://localhost:8080/users/sharedKey/${sharedKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('should save a client', () => {
    const request = { name: 'Client 1' };

    service.saveClient(request).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/users/create');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });


});







