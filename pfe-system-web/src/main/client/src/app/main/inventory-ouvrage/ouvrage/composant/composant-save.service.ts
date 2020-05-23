import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';

const Security_API = API + '/composants/security/';
const PriseEau_API = API + '/composants/priseEau/';
const EquipementStationTraitement_API = API + '/composants/equipementStationTraitement/';
const KitMembrane_API = API + '/composants/kitMembrane/';
const StationPhp_API = API + '/composants/stationPhp/';
const LocalStockageChimique_API = API + '/composants/localStockage/';
const BatimentElectrique_API  = API + '/composants/batimentElectrique/';
const GroupeElectrogene_API  = API + '/composants/groupeElectrogene/';
const PosteChimique_API  = API + '/composants/postChimique/';
const PosteTransformationElectrique_API = API + '/composants/postTransformationElectrique/';
const GroupeElectroPompePompe_API = API + '/composants/groupeElectroPompePompe/';
const GroupeElectroPompeMoteur_API = API + '/composants/groupeElectroPompeMoteur/';
const ArmoireElectrique_API = API + '/composants/armoireElectrique/';
const AntiBelier_API = API + '/composants/antiBelier/';
const SoupapeDecharge_API = API + '/composants/soupapeDecharge/';
const EquipementHydroMeca_API = API + '/composants/equipementHydroMeca/';
const PostChloration_API = API + '/composants/postChloration/';
const Composant_API=API + '/ouvrage/';

@Injectable({
    providedIn: 'root'
})

export class ComposantSaveService {

    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------


    saveSecurity(security,code) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(Security_API + code, security)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.security');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.security');
                    console.log(error);
                    reject();
                });

        });

    }

    savePriseEau(priseEau,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PriseEau_API+ code, priseEau)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.priseEau');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.priseEau');
                    console.log(error);
                    reject();
                });

        });

    }
    saveEquipementStationTraitement(equipement,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(EquipementStationTraitement_API+ code, equipement)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.equipement');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.equipement');
                    console.log(error);
                    reject();
                });

        });

    }

    saveKitMembrane(kit,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(KitMembrane_API+ code, kit)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.kit');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.kit');
                    console.log(error);
                    reject();
                });

        });

    }

    saveStationPhp(station,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(StationPhp_API+ code, station)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.station');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.station');
                    console.log(error);
                    reject();
                });

        });

    }

    saveLocalStockageChimique(local,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(LocalStockageChimique_API + code, local)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.local');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.local');
                    console.log(error);
                    reject();
                });

        });

    }

    saveBatimentElectrique(batiment,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(BatimentElectrique_API + code, batiment)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.batiment');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.batiment');
                    console.log(error);
                    reject();
                });

        });

    }

    saveGroupeElectrogene(groupe,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(GroupeElectrogene_API + code, groupe)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.groupe');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.groupe');
                    console.log(error);
                    reject();
                });

        });

    }

    savePostChimique(post,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PosteChimique_API + code, post)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.postChimique');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postChimique');
                    console.log(error);
                    reject();
                });

        });

    }

    savePostTrandformationElectrique(post,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PosteTransformationElectrique_API + code, post)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.postElectrique');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postElectrique');
                    console.log(error);
                    reject();
                });

        });

    }

    savePompe(pompe,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(GroupeElectroPompePompe_API + code, pompe)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.pompe');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.pompe');
                    console.log(error);
                    reject();
                });

        });

    }

    saveMoteur(moteur,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(GroupeElectroPompeMoteur_API + code, moteur)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.moteur');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.moteur');
                    console.log(error);
                    reject();
                });

        });

    }

    saveArmoire(armoire,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(ArmoireElectrique_API + code, armoire)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.armoire');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.armoire');
                    console.log(error);
                    reject();
                });

        });

    }

    saveAntiBelier(antiBelier,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(AntiBelier_API + code, antiBelier)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.antiBelier');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.antiBelier');
                    console.log(error);
                    reject();
                });

        });

    }

    saveSoupape(soupape,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(SoupapeDecharge_API + code, soupape)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.soupape');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.soupape');
                    console.log(error);
                    reject();
                });

        });

    }

    saveHydroMeca(equipementHydroMeca,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(EquipementHydroMeca_API + code, equipementHydroMeca)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.equipementHydroMeca');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.equipementHydroMeca');
                    console.log(error);
                    reject();
                });

        });

    }

    savePostChloration(postChloration,code){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PostChloration_API + code, postChloration)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.postChloration');
                    resolve();
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postChloration');
                    console.log(error);
                    reject();
                });

        });

    }



}
