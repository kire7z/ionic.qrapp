import { Component } from '@angular/core';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
/*components*/
 import { ToastController,Platform } from 'ionic-angular';
/*plugins*/
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/*providers*/
import { HistorialProvider } from '../../providers/historial/historial'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  i:number=0;
  constructor(private barcodeScanner: BarcodeScanner,private toastCtrl:ToastController,private platform:Platform, private hist:HistorialProvider) {

  }

  scan(){
    console.log("Realizando scan");
    this.i++;
    if(!this.platform.is('cordova'))
    {
      if(this.i%2==0)
        //this.hist.agregarHistorial("http://www.google.com");
        this.hist.agregarHistorial("MATMSG:TO:kire7z@hhotmail.com;SUB:prueba de concepto;BODY:mensaje body;;");
      else
      {
        if(this.i%3==0)
          this.hist.agregarHistorial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD`);
        else
          this.hist.agregarHistorial("geo:-0.2361263,-78.5267599");
      }
      return;
    }
    this.barcodeScanner.scan().then(barcodeData => {
        /*console.log('text', barcodeData.text);
        console.log('formato', barcodeData.format);
        console.log('cancelado', barcodeData.cancelled);*/
        if(!barcodeData.cancelled && barcodeData.text!=null )
        {
          this.mostrarError(`Agregado barcode`);
          this.hist.agregarHistorial(barcodeData.text);          
        }
      }//,erro=>{console.log(erro);});
      ).catch(err => {
        console.log('Error', err);
        this.mostrarError(`Error: ${err}`);
      });
    }
    mostrarError(mensaje:string){
      let toast = this.toastCtrl.create({
        message:mensaje,
        duration:2000
      });
      toast.present();
    }
}
