import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'detection';

  constructor() {}

  ngOnInit(): void {
  }
}
