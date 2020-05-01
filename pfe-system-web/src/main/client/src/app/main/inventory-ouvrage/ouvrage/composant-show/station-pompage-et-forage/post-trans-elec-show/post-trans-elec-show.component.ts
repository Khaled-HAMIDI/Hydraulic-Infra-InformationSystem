import {Component, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantShowService} from "../../composant-show.service";
import {PosteTransformationElectrique} from "../../../../../model/composant.model";

@Component({
  selector: 'app-post-trans-elec-show',
  templateUrl: './post-trans-elec-show.component.html',
  styleUrls: ['./post-trans-elec-show.component.scss'],
    animations: fuseAnimations
})
export class PostTransElecShowComponent implements OnInit {

    post: PosteTransformationElectrique;
    exist:boolean;

    constructor(
        private composantShowService: ComposantShowService,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService) {

        this.fuseTranslationLoader.loadTranslations(french, arabic);
        this.exist=true;
        this.post=new PosteTransformationElectrique();
    }

    ngOnInit(): void {
        this.composantShowService.loadPostTrandformationElectrique(this.route.snapshot.params['code']).then(
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
        this.post= new PosteTransformationElectrique(composant);

    }

}
