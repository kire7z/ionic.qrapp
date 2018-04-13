import { Component } from '@angular/core';
import {HistorialProvider} from '../../providers/historial/historial';
import { ScanData } from '../../models/scanData.model';
import {Refresher } from 'ionic-angular';
/**
 * Generated class for the GuardadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {
  historial:ScanData[]=[];
  tipos:string[]=[];
  constructor(private hist:HistorialProvider) {
  }
  //ionViewWillEnter
  ionViewDidLoad() {
    //debugger;
    this.historial= this.hist.cargarHistorial();
    this.tipos = this.historial.map(r=>r.tipo).filter((r,i,self)=>{
      return self.indexOf(r)===i;
    });
  }
  abrir_scan(i:number,tipo:string)
  {
    this.hist.abrir_scan(i,tipo);
  }
  refrescar(refresher:Refresher)
  {
    this.historial= [];
    this.tipos =[];

    setTimeout(()=>{
          this.historial = this.hist.cargarHistorial()
          this.tipos = this.historial.map(r=>r.tipo).filter((r,i,self)=>{
            return self.indexOf(r)===i;
          });
          refresher.complete();
        },2000);
  }
}
