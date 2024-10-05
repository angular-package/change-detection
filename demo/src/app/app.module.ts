import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Component
import { AppComponent } from './app.component';

// Module.
import { AppRoutingModule } from './app-routing.module';
import { DetectionComponent } from './detection/detection.component';


@NgModule({
  declarations: [
    AppComponent,
    DetectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
