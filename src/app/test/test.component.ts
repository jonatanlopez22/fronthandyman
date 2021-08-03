
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  {

  title = 'cal';

  public isOn = false;

  get message() {
    return `La luz esta ${this.isOn ? 'Prendida' : 'Apagada'} `;
  }

  public clicked(): void {
    this.isOn = !this.isOn;
  }

}



