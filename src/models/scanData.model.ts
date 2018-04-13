/*
this._historialService.agregar_historial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );
*/
/*
MATMSG:TO:kire7z@hhotmail.com;SUB:prueba de concepto;BODY:mensaje body;;
*/
export class ScanData{
  info:string;
  tipo:string;

  constructor(texto:string){
    this.tipo=undefined;
    if(texto.startsWith('http'))
      this.tipo="http";
    if(texto.startsWith('geo'))
      this.tipo="geo";
    if(texto.startsWith('BEGIN:VCARD'))
      this.tipo='contacto';
    if(texto.startsWith('MATMSG:'))
      this.tipo='mail';
    this.info=texto;
  }
}
