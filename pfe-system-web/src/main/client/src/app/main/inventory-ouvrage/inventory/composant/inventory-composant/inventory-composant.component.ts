import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-inventory-composant',
  templateUrl: './inventory-composant.component.html',
  styleUrls: ['./inventory-composant.component.scss']
})
export class InventoryComposantComponent implements OnInit {

    @Input() typeComposant: string = 'default';

    @Output() validateEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
