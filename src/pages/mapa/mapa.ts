import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  title:string;
  lat:number;
  lng:number;
  constructor(public navParams: NavParams,private viewCtrl:ViewController ) {
    let info=this.navParams.get("coords");    
    let coords= info.split("geo:")[1];
    this.lat=Number(coords.split(',')[0]);
    this.lng=Number(coords.split(',')[1])
    this.title = "HomePlace";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }
  cerrar(){
    this.viewCtrl.dismiss();
  }
}
