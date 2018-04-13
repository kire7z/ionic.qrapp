import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scanData.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

import { ModalController,Platform, ToastController} from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';

/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {
  private historial:ScanData[]=[];
  constructor(private platform:Platform,
              private brows:InAppBrowser,
              private modalCtrl:ModalController,
              private toastCtrl:ToastController,
              private contacts: Contacts) {
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
    this.abrir_scan(0,data.tipo);
    console.log(this.historial);
  }
  abrir_scan(i:number,tipo:string)
  {
    let array = this.historial;
    if(tipo)
      array= this.historial.filter(i=>i.tipo==tipo);
    let scanData = array[i];
    let browser:any;
    if(scanData.tipo=="http"){
      this.platform.ready().then(()=>{
        browser = this.brows.create(scanData.info,"_system");
      });
    }
    if(scanData.tipo=="geo")
    {
      this.modalCtrl.create(MapaPage,{coords:scanData.info}).present();
    }
    if(scanData.tipo=="contacto")
    {
      this.crearContacto(scanData.info);
    }
    if(scanData.tipo=="mail")
    {
      this.platform.ready().then(()=>{
        //mailto:someone@example.com?Subject=Hello%20again
        //MATMSG:TO:kire7z@hhotmail.com;SUB:prueba de concepto;BODY:mensaje body;;
        browser = this.brows.create(this.obtenerMail(scanData.info),"_system");
      });
    }
  }
  obtenerMail(ruta:string)
  {
    let info:string=ruta.split('MATMSG:TO:')[1];
    let to:string[]=info.split('SUB:');
    let subj:string = to[1].split('BODY:')[0];
    let body:string = to[1].split('BODY:')[1];
    return 'mailto:'+to[0]+'?subject='+subj+'&body='+body;
  }
  crearContacto(info:string)
  {
    let campos:any = this.parse_vcard(info);
    //console.log(campos);
    if(!this.platform.is('cordova'))
    {
      console.warn("Estoy en desarrollo no se puede crear contacto");
      return;
    }
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName('SR.', campos.fn);
    contact.phoneNumbers = [new ContactField('mobile', campos.tel[0].value[0])];
    contact.save().then(
      () => this.crearToast('Contact saved!'),
      (error: any) => {
        console.error('Error saving contact.', error);
        this.crearToast('Error: Contact saved!'  + error);
    });
  }
  private crearToast(mensaje:string)
  {
    let toast = this.toastCtrl.create({
      message:mensaje,
      duration:3000
    });
    toast.present();
  }
  private parse_vcard( input:string ) {

      var Re1 = /^(version|fn|title|org):(.+)$/i;
      var Re2 = /^([^:;]+);([^:]+):(.+)$/;
      var ReKey = /item\d{1,2}\./;
      var fields = {};

      input.split(/\r\n|\r|\n/).forEach(function (line) {
          var results, key;

          if (Re1.test(line)) {
              results = line.match(Re1);
              key = results[1].toLowerCase();
              fields[key] = results[2];
          } else if (Re2.test(line)) {
              results = line.match(Re2);
              key = results[1].replace(ReKey, '').toLowerCase();

              var meta = {};
              results[2].split(';')
                  .map(function (p, i) {
                  var match = p.match(/([a-z]+)=(.*)/i);
                  if (match) {
                      return [match[1], match[2]];
                  } else {
                      return ["TYPE" + (i === 0 ? "" : i), p];
                  }
              })
                  .forEach(function (p) {
                  meta[p[0]] = p[1];
              });

              if (!fields[key]) fields[key] = [];

              fields[key].push({
                  meta: meta,
                  value: results[3].split(';')
              })
          }
      });

      return fields;
  };
}
