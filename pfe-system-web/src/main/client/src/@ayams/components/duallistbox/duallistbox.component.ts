import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import differenceBy from 'lodash/differenceBy';
import concat from 'lodash/concat';
import { uniqBy } from 'lodash-es';

@Component({
    selector: 'ayams-dual-list-box',
    templateUrl: './duallistbox.component.html',
    styleUrls: ['./duallistbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DuallistboxComponent implements OnInit {

    @Output() itemAdded: EventEmitter<any> = new EventEmitter();
    @Output() itemRemoved: EventEmitter<any> = new EventEmitter();

    @Input()
    events: Observable<void>;

    public fullList: any[] = [];
    public itemsFiltered: any[] = [];
    public selectedItemsFiltered: any[] = [];
    public filterText: string;
    public filterSelectedText: string;

    private _items: any[] = [];

    @Input()
    set items(items: any[]) {
        this._items = items;
        this.fullList = uniqBy(concat(this._items, this.selectedItems), 'id');
        this.update();
    }

    get items(): any[] {
        return this._items;
    };

    @Input() selectedItems: any[] = [];

    @Output() selectedItemsChange = new EventEmitter<any>();

    @Input() properties: string[];
    @Input() filtredBy: string[] = [];
    @Input() idProperty: string = 'id';
    @Input() showFilter: boolean = true;
    @Input() filterPlaceholder: string = 'Filter';
    @Input() itemsTitle: string = 'Items'
    @Input() itemsSelectedTitle: string = 'Items selected'

    constructor() {
    }

    ngOnInit() {
        this.fullList = uniqBy(concat(this._items, this.selectedItems), 'id');
        this.update();
        this.events.subscribe((response: any) => {
            this.selectedItems = response;
        }

        );
    }

    update() {
        this.updateItems();
        this.updateSelectedItems();
    }

    updateItems() {
        this._items = differenceBy(this.fullList, this.selectedItems, this.idProperty);
        this.filterItems(this.filterText);
    }

    updateSelectedItems() {
        this.selectedItemsFiltered = this.selectedItems;
        this.filterSelectedItems(this.filterSelectedText);
    }

    addItem(item) {
        this.itemAdded.emit(item);
        this.selectedItems.push(item);
        this.selectedItemsChange.emit(this.selectedItems);
        this.update();
    }

    addItems() {
        this.selectedItems = concat(this.selectedItems, this.itemsFiltered);
        this.itemsFiltered = [];
        this.selectedItemsChange.emit(this.selectedItems);
        this.updateSelectedItems();
    }

    removeItems() {
        this.itemsFiltered = concat(this.itemsFiltered, this.selectedItems);
        this.selectedItems = [];
        this.selectedItemsChange.emit(this.selectedItems);
        this.updateSelectedItems();
    }

    removeItem(item) {
        console.log(item);
        
        this.itemRemoved.emit(item);
        this.selectedItems = this.selectedItems.filter(i => item.id != i.id);
        this.selectedItemsChange.emit(this.selectedItems);
        this.update();
    }

    filterItems(text: string) {
        this.filterText = text;
        if (!text || !text.replace(" ", "")) {
            this.itemsFiltered = this._items;
            return;
        }
        this.itemsFiltered = this._items
            .filter(item => this.concatTextToFilter(item).toLowerCase().includes(text.toLowerCase()));
    }

    filterSelectedItems(text: string) {
        this.filterSelectedText = text;
        if (!text || !text.replace(" ", "")) {
            this.selectedItemsFiltered = this.selectedItems;
            return;
        }
        this.selectedItemsFiltered = this.selectedItems
            .filter(item => this.concatTextToFilter(item).toLowerCase().includes(text.toLowerCase()));
    }

    concatTextToFilter(item) {
        let text = '';
        for (let i = 0; i < this.filtredBy.length; i++) {
            text += item[this.filtredBy[i]];
        }
        return text;
    }
}
