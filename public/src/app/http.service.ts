import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){}

  getAllReceipts(){
    return this._http.get('/api/receipt');
  }

  getOneReceipt(receipt_id){
    return this._http.get(`/api/receipts/${receipt_id}`);
  }

  addReceipt(newReceipt){
    // console.log("API", newReceipt)
    return this._http.post('/api/receipts', newReceipt);
  }

  updateReceipt(receipt_id, receipt){
    return this._http.put(`/api/receipts/${receipt_id}`, receipt);
  }

  deleteReceipt(receipt_id){
    return this._http.delete(`/api/receipts/${receipt_id}`);
  }

}
