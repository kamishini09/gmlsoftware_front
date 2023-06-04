import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from 'src/app/model/client-model';
import { ClientsService } from 'src/app/service/clients.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  
  listClient: ClientModel[] = [];
  
  formClient: FormGroup = new FormGroup({});

  isUpdate: boolean = false;
  isSearch: boolean = false;
  searchSK: string = '';

  constructor(private clientsService: ClientsService, private fb: FormBuilder ){
  }

  ngOnInit(): void {
    this.list();
    this.formClient = new FormGroup({
      sharedKey: new FormControl(''),
      name: new FormControl(null,[Validators.required]),
      phone: new FormControl(null, [Validators.maxLength(10),Validators.minLength(7),Validators.pattern('^[0-9]+$')]),
      email: new FormControl(null, [Validators.email]),
      startDate: new FormControl(null,[Validators.required]),
      endDate: new FormControl(null,[Validators.required])
    });
  }

  save() {
    if(this.formClient.valid){
      this.clientsService.saveClient(this.formClient.value).subscribe(
        response => {
          if (response) {
            this.list();
            this.formClient.reset();
            alert("Usuario Creado con exito!");
          }
        }
      )
    }else{
      alert('El formulario no ha sido debidamente diligenciado');
    }    
  }

  searchSharedKey() {
    if (!this.isSearch) {
      if (this.searchSK) {
        this.clientsService.getClientsBySharedKey(this.searchSK).subscribe(
          res => {
            if (res) {
              this.listClient = [res];
              this.isSearch = true;
            }
          }
        )
      }
    } else {
      this.searchSK = '';
      this.isSearch = false;
      this.list();
    }
  }

  download() {
    if (!this.listClient) {
      alert("No hay clientes para realizar una descarga.");
    } else {
      this.clientsService.getDownloadFile();
    }

  }

  list() {
    this.clientsService.getClients().subscribe(res => {
      if (res) {
        this.listClient = res;
      }
    })
  }

  newClient() {
    this.isUpdate = false;
    this.formClient.reset();
  }


  selectItem(item: any) {
    this.isUpdate = true;
    this.formClient.controls['name'].setValue(item.name);
    this.formClient.controls['phone'].setValue(item.phone);
    this.formClient.controls['email'].setValue(item.email);
    this.formClient.controls['startDate'].setValue(item.startDate);
    this.formClient.controls['endDate'].setValue(item.endDate);

  }


}
