import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ouvrage } from '../../../model/ouvrage.model';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { OuvrageShowService } from "./ouvrage-show.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
    selector: 'app-ouvrage-show',
    templateUrl: './ouvrage-show.component.html',
    styleUrls: ['./ouvrage-show.component.scss'],
    animations: fuseAnimations
})
export class OuvrageShowComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    ouvrage: Ouvrage;
    filesToBeShowed: any[];

    constructor(
        private ouvrageShowService: OuvrageShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {
        this._unsubscribeAll = new Subject();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.filesToBeShowed = [
            {
                name: 'PV de réception',
                title: 'PV de réception',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , if case update set id of entity 
                attachedDocumentType: 'PV_REC',
                required: true
            },
            {
                name: 'Documentation technique',
                title: 'Documentation technique',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'DOC_TECH'
            },
            {
                name: 'Plans de recollement',
                title: 'Plans de recollement',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'PLAN_RC'
            },
            {
                name: 'Fiche technique',
                title: 'Fiche technique',
                format: '.pdf',
                attachmentEntity: 'OUVRAGE',
                attachmentEntityId: null,// set null in case add , case update set id of entity 
                attachedDocumentType: 'FICH_TECH'
            }
        ];
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[0])
                this.initOuvrage(response.data[0]);
                this.filesToBeShowed.forEach(item => {
                    item.attachmentEntityId = response.data[0].code
                  });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initOuvrage(ouvrage) {
        this.ouvrage = new Ouvrage(ouvrage);

    }

    onPrintFicheTechnique(code: string, type: string){
        this.ouvrageShowService.printFicheTechnique(code, type);
      }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
