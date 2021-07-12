import { Component } from '@angular/core';
@Component({
  selector: 'app-check-box-printer',
  templateUrl: './check-box-printer.component.html',
  styleUrls: ['./check-box-printer.component.scss']
})
export class CheckBoxPrinterComponent {
  isChecked = false;

  check(): boolean {
    return this.isChecked = true;
  }

  unCheck(): boolean {
    return this.isChecked = false;
  }
}
