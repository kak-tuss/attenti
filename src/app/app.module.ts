import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

import { DisplayComponent } from "./display/display.component";

@NgModule({
  declarations: [AppComponent, DisplayComponent],
  imports: [BrowserModule, FormsModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
