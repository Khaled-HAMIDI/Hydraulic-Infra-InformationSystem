import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'ayams-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  @Input()
  public myText: String;
  @Input()
  public type: String;

  myClass: String;
  myIcone: String;
  constructor() { }

  ngOnInit() {

    switch (this.type) {
      case "error":
        this.myClass = "alert-error";
        this.myIcone = "error_outline";
        break;
      case "warning":
        this.myClass = "alert-warning";
        this.myIcone = "warning";
        break;
      case "info":
        this.myClass = "alert-info";
        this.myIcone = "info";
        break;
      case "success":
        this.myClass = "alert-success";
        this.myIcone = "check_circle_outline";
        break;
    }
  }

}
