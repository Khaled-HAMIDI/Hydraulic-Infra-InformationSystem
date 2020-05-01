import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from '../i18n/fr';
import { locale as arabic } from '../i18n/ar';
import {ComposantService} from "../../composant.service";

@Component({
  selector: 'app-post-recyclage-boues',
  templateUrl: './post-recyclage-boues.component.html',
  styleUrls: ['./post-recyclage-boues.component.scss'],
    animations: fuseAnimations
})
export class PostRecyclageBouesComponent implements OnInit{

    postRecyBouForm: FormGroup;

    constructor(
        private composantService : ComposantService,
        private formBuilder: FormBuilder,
        private router :Router,
        private route: ActivatedRoute,
        private fuseTranslationLoader: FuseTranslationLoaderService
    ) {
        // Set the default
        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.initForm();

    }


    createForm(): FormGroup {
        let obj = {
            typeComposant: ['PosteChimique'],
            postType: ['RecyclageBoues'],
            lieuImplantation:['',Validators.required],
            type: [''],
            form:[''],
            dimension: [''],
            number:[''],
            dosagePompe:['',Validators.required],
            modePompe:['',Validators.required],
            statePompe: ['',Validators.required],
            typePompe:['',Validators.required],
            debitPompe: ['',Validators.required],
            hmtPompe:['',Validators.required],
            puissancePompe: ['',Validators.required],
            nombrePompe:['',Validators.required],
            fonctionnementPompe: [true,Validators.required],
            pointInjectPompe: ['',Validators.required],
        };

        return this.formBuilder.group(obj);

    }

    initForm(){
        this.postRecyBouForm = this.createForm();
    }

    onSave(): void {

        const post = this.postRecyBouForm.getRawValue();

        this.composantService.savePostChimique(post,this.route.snapshot.params['code'])
            .then((response) => {
                    console.log("It worked");
                },
                (error) => {
                    console.log("No")
                });
    }


}
