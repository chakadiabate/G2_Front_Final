import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    AppModule,
    HttpClientModule
 
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
