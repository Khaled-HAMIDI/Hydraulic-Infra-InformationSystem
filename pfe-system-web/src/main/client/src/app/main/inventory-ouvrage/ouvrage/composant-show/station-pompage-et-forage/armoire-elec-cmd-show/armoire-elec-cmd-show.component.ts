import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {ArmoireElectrique} from "../../../../../model/composant.model";

@Component({
  selector: 'app-armoire-elec-cmd-show',
  templateUrl: './armoire-elec-cmd-show.component.html',
  styleUrls: ['./armoire-elec-cmd-show.component.scss'],
    animations: fuseAnimations
})
export class ArmoireElecCmdShowComponent implements OnInit {

    armoire: ArmoireElectrique;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.armoire=new ArmoireElectrique();
    }

    ngOnInit(): void {
        this.composantShowService.loadArmoire(this.route.snapshot.params['code']).then(
            (composant) => {
                if (composant) this.initComposant(composant);
                else this.exist =false ;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    initComposant(composant) {
        this.armoire= new ArmoireElectrique(composant);

    }

}
