import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import {ComposantShowService} from "../composant-show.service";
import {Security} from "../../../../model/composant.model";

@Component({
  selector: 'app-security-show',
  templateUrl: './security-show.component.html',
  styleUrls: ['./security-show.component.scss'],
    animations: fuseAnimations
})
export class SecurityShowComponent implements OnInit {

    security: Security;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.security=new Security();
    }

    ngOnInit(): void {
        this.composantShowService.loadSecurity(this.route.snapshot.params['code']).then(
            (composant) => {
                if (composant) {
                    this.initComposant(composant);
                    console.log(composant);
                }
                else this.exist =false ;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initComposant(composant) {
        this.security= new Security(composant);

    }

}
