import {Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Chain} from './model/chain.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChainAddEditService } from './chain-add-edit.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';



/* A appliquer pour le code des chains
const REGX_CODE = "^[a-zA-Z0-9]{2}$";*/

@Component({
  selector: 'app-chain-add-edit',
  templateUrl: './chain-add-edit.component.html',
  styleUrls: ['./chain-add-edit.component.scss'],
    animations: fuseAnimations
})

export class ChainAddEditComponent implements OnInit, OnDestroy {



    constructor(

    ) {
        // Set the default
    }

    /**
     * On init
     */
    ngOnInit(): void {
        
    }


    ngOnDestroy(): void {

    }

}




