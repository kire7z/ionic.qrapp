import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scanData.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController} from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';
/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {
  private historial:ScanData[]=[];
  constructor(private brows:InAppBrowser,private modalCtrl:ModalController) {
    console.log('Hello HistorialProvider Provider');
  }
  cargarHistorial()
  {
    return this.historial;
  }
  agregarHistorial(texto:string){
    let data = new ScanData(texto);
    //this.historial.push(data);//ubica al final
    this.historial.unshift(data);//ubica al inicio
    this.abrir_scan(0,undefined);
    console.log(this.historial);
  }
  abrir_scan(i:number,tipo:string)
  {
    let array = this.historial;
    if(tipo)
      array= this.historial.filter(i=>i.tipo==tipo);
    let scanData = array[i];
    let browser:any;
    if(scanData.tipo=="http")
      browser = this.brows.create(scanData.info,"_system");
    if(scanData.tipo=="geo")
    {
      this.modalCtrl.create(MapaPage,{coords:scanData.info}).present();      
    }
    //browser.executeScript(...);
    //browser.insertCSS(...);
    //browser.close();
  }
}
