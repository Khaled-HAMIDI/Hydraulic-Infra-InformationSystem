import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {Chain} from "./model/chain.model";
import {ChainEditService} from "./chain-edit.service";

@Component({
  selector: 'app-chain-edit',
  templateUrl: './chain-edit.component.html',
  styleUrls: ['./chain-edit.component.scss'],
    animations: fuseAnimations
})

export class ChainEditComponent implements OnInit, OnDestroy {

    chain: Chain;
    test: Chain;
    chainForm: FormGroup;
    chainCode: string;


    constructor(
        private chainEditService: ChainEditService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.chain = new Chain();
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    ngOnInit(): void {
    }


    onSave(): void {
  
    }

    initForm(chain) {


    }

    ngOnDestroy(): void {
    }
}
