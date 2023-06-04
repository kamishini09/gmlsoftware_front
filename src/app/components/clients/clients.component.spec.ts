import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsService } from 'src/app/service/clients.service';
import { of } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientModel } from 'src/app/model/client-model';
import { ClientsComponent } from './clients.component';


describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientsService: jasmine.SpyObj<ClientsService>;

  beforeEach(async () => {
    const clientsServiceSpy = jasmine.createSpyObj('ClientsService', [
      'getClients',
      'getClientsBySharedKey',
      'saveClient',
      'getDownloadFile'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      providers: [
        { provide: ClientsService, useValue: clientsServiceSpy },
        FormBuilder
      ],
      imports: [ReactiveFormsModule] // Agregar ReactiveFormsModule aquí
    }).compileComponents();

    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      providers: [
        { provide: ClientsService, useValue: clientsServiceSpy },
        FormBuilder
      ],
      imports: [FormsModule] // Agregar FormsModule aquí
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    clientsService = TestBed.inject(ClientsService) as jasmine.SpyObj<ClientsService>;
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on initialization', () => {
    const mockClients: ClientModel[] = [
      { sharedKey: '1', name: 'Client 1', phone: 123456789, email: 'client1@example.com', startDate: '', endDate: '' },
      { sharedKey: '2', name: 'Client 2', phone: 987654321, email: 'client2@example.com', startDate: '', endDate: '' }
    ];
    clientsService.getClients.and.returnValue(of(mockClients));

    fixture.detectChanges();

    expect(clientsService.getClients).toHaveBeenCalled();
    expect(component.listClient).toEqual(mockClients);
  });

  


  it('should search by shared key', () => {
    const mockClient: ClientModel = { sharedKey: '1', name: 'Client 1', phone: 123456789, email: 'client1@example.com', startDate: '', endDate: '' };
    clientsService.getClientsBySharedKey.and.returnValue(of(mockClient));

    component.searchSK = '1';
    component.searchSharedKey();

    expect(clientsService.getClientsBySharedKey).toHaveBeenCalledWith('1');
    expect(component.listClient).toEqual([mockClient]);
    expect(component.isSearch).toBeTrue();
  });



});
