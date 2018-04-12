import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage,GuardadosPage,MapaPage,TabsPage } from '../pages/index.paginas';
import { HistorialProvider } from '../providers/historial/historial';

//Pipes
import { FTiposPipe } from '../pipes/f-tipos/f-tipos';

//apis externos
import { AgmCoreModule } from '@agm/core'

@NgModule({
  declarations: [
    MyApp,
    HomePage,GuardadosPage,MapaPage,TabsPage
    ,FTiposPipe
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyCIdzXx6nCmAlWJeEJqZ29Wsb6koY5vD0M'}),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,GuardadosPage,MapaPage,TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider
  ]
})
export class AppModule {}
