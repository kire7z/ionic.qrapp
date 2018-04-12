import { Pipe, PipeTransform } from '@angular/core';
import { ScanData } from '../../models/scanData.model'
/**
 * Generated class for the FTiposPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'fTipos',
  pure: false//siempre evalua
})
export class FTiposPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items:ScanData[],tipo:string):ScanData[] {
    let filtro= items.filter(i=>i.tipo==tipo);
    return filtro;
  }
}
