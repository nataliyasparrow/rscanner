import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  constructor(private _rec: HttpClient){}

  getRecReciept(){
    console.log("OCR Service")
    return this._rec.get('/api/recognizer');
  }

  getRecRecieptBrf(){
      console.log("BRF Service")
      return this._rec.get('/api/brf_recognizer');
    }

}
