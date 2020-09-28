import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecognitionService } from '../recognition.service'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(  
    private _route: ActivatedRoute,
    private _router: Router, 
    private _httpService: HttpService,
    private _recService: RecognitionService) {
  }
  // newReceipt: any;
  resultOcr: any;
  resultBrf: any;
  isResultOcr: boolean;
  isResultBrf: boolean;


  ngOnInit() {
    this.resultOcr = {};
    this.resultBrf = {};
    this.isResultOcr = false;
    this.isResultBrf = false;

  // const subscriptionKey = process.env['COMPUTER_VISION_SUBSCRIPTION_KEY'];
  // const endpoint = process.env['COMPUTER_VISION_ENDPOINT'];
  // this.newReceipt = {store: "", date: "", items: []};
  }

  RecognizeOcr(){
      let observable = this._recService.getRecReciept();
      // console.log("Observable")
      // console.log(observable);
      observable.subscribe((data: any) => {
        // console.log("Subscribe")
        // this.result = data.body;
        // console.log("Got data!", data);
        console.log("Got data OCR", data);
        this.resultOcr = data;
        this.isResultOcr = true;
        // let jsonResponse = JSON.stringify(JSON.parse(data), null, '  ');
        // this.SaveRes(data);
        // this.result = data['language']
        // console.log("Results:", this.result)
        // console.log("jsonResponse:", jsonResponse)
        // return this._router.navigate(['result']);
    })
  }

  RecognizeBrf(){
    let observable = this._recService.getRecRecieptBrf();
    // console.log("Observable")
    // console.log(observable);
    observable.subscribe((data: any) => {
      // console.log("Subscribe")
      // this.result = data.body;
      // console.log("Got data!", data);
      console.log("Got data BRF", data);
      this.resultBrf = data;
      this.isResultBrf = true;
      // let jsonResponse = JSON.stringify(JSON.parse(data), null, '  ');
      // this.SaveRes(data);
      // this.result = data['language']
      // console.log("Results:", this.result)
      // console.log("jsonResponse:", jsonResponse)
      // return this._router.navigate(['result']);
  })
}

  // SaveRes(data: any){
  //   this.result = data['language'];
  //   console.log(this.result)
  // }
}

