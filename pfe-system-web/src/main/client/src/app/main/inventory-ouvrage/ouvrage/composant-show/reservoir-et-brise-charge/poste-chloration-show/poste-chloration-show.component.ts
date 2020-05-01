import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {PosteChloration} from "../../../../../model/composant.model";

@Component({
  selector: 'app-poste-chloration-show',
  templateUrl: './poste-chloration-show.component.html',
  styleUrls: ['./poste-chloration-show.component.scss'],
    animations: fuseAnimations
})
export class PosteChlorationShowComponent implements OnInit {

    posteChloration: PosteChloration;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.posteChloration=new PosteChloration();
    }

    ngOnInit(): void {
        this.composantShowService.loadPostChloration(this.route.snapshot.params['code']).then(
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
        this.posteChloration= new PosteChloration(composant);

    }

}
