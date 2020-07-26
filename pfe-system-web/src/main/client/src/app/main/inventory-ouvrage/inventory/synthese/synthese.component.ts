import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from './Table'
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
import {SyntheseService} from "./synthese.service";
const COLUMN_NAMES: string[] = [
    'componentType',
    'state',
    'nbv',
    'nbp',
    'gap',
    'observation'
];

@Component({
  selector: 'app-synthese',
  templateUrl: './synthese.component.html',
  styleUrls: ['./synthese.component.scss'],
    animations: fuseAnimations
})
export class SyntheseComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    btnExport: boolean;
    emptyList: boolean;
    dates =[];
    ouvrages = [];
    components = [];
    filtredComponents =[];
    ouvrageData =[];
    inventoryCode :string;

    constructor(
        private syntheseService: SyntheseService,
        private route: ActivatedRoute,
        private toolsService: ToolsService,
        public router: Router) {
        super(COLUMN_NAMES)
        this._unsubscribeAll = new Subject();
        this.toolsService.loadTranslations(french, arabic);
    }

    ngOnInit() {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[2]);
                this.inventoryCode = this.route.snapshot.params['codeInventory'];
                this.dates = response.data[1];
                this.btnExport = response.data[0].length;
                this.emptyList = response.data[0].length == 0;
                this.ouvrages = response.data[0];
                for (let component of response.data[2]){
                    if (component.done) this.components.push(component);
                    else {
                        component.state = 'Pas encore inventorié';
                        component.gap = 0;
                        component.number = 0;
                        component.observation = '/';
                        this.components.push(component);
                    }
                }
                console.log(this.components);
                this.filtredComponents =this.components;

                for (let i in this.ouvrages){
                    this.ouvrageData.push({
                        ouvrage :this.ouvrages[i],
                        finishDate :this.dates[i],
                    })
                }

                this.initTable(this.components);
            },
            (error) => {
                console.log(error);
            }
        );
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------

    calculGap(a1:number , a2:string){return Number(a2)-a1}

    updateTable(ouvrage) {

        this.filtredComponents =this.components.filter(component => component.ouvrageCode === ouvrage.ouvrage.code);
        this.dataSource.data = this.filtredComponents;
        this.checkPage();
    }

    InventoryValidate() {
        this.syntheseService.inventoryValidate()
            .then((response:any) => {
                    console.log(response);
                    this.router.navigate(['/patrimony/inventory/completed']);

                },
                (error) => {
                    console.log("No")
                });
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
