import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../model/client-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<ClientModel[]>{
    return this.httpClient.get<ClientModel[]>('http://localhost:8080/users/all').pipe(map(res=>res)); 
  }

  getClientsBySharedKey(sharedKey:string): Observable<ClientModel>{
    return this.httpClient.get<ClientModel>('http://localhost:8080/users/sharedKey/' + sharedKey ).pipe(map(res=>res));
  }

  saveClient(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/users/create',request).pipe(map(res=>res));
  }

  getDownloadFile(): void {
    this.httpClient.get('http://localhost:8080/users/download', { responseType: 'arraybuffer' })
      .subscribe(response => {
        this.descargarArchivo(response);
      }, error => {
        console.error('Error al descargar el archivo', error);
      });
  }
  
  private descargarArchivo(data: any): void {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cvc.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
