export class ScanData{
  info:string;
  tipo:string;

  constructor(texto:string){
    this.tipo=undefined;
    if(texto.startsWith('http'))
      this.tipo="http";
    if(texto.startsWith('geo'))
      this.tipo="geo";
    this.info=texto;
  }
}
