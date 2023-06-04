export class ClientModel{
   sharedKey : string ='';
   name : string ='';
   phone : number =0;
   email : string ='';
   startDate: string = new Date().toISOString().split('T')[0];
   endDate: string = new Date().toISOString().split('T')[0];
}