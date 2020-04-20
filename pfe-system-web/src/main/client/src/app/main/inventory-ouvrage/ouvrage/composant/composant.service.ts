import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';

const Security_API = API + '/composants/security';
const PriseEau_API = API + '/composants/priseEau';
const EquipementStationTraitement_API = API + '/composants/equipementStationTraitement';
const KitMembrane_API = API + '/composants/kitMembrane';
const StationPhp_API = API + '/composants/stationPhp';
const LocalStockageChimique_API = API + '/composants/localStockage';
const BatimentElectrique_API  = API + '/composants/batimentElectrique';
const GroupeElectrogene_API  = API + '/composants/groupeElectrogene';
const PosteChimique_API  = API + '/composants/postChimique';
const PosteTransformationElectrique_API = API + '/composants/postTransformationElectrique';
const GroupeElectroPompePompe_API = API + '/composants/groupeElectroPompePompe';
const GroupeElectroPompeMoteur_API = API + '/composants/groupeElectroPompeMoteur';
const ArmoireElectrique_API = API + '/composants/armoireElectrique';
const AntiBelier_API = API + '/composants/antiBelier';
const SoupapeDecharge_API = API + '/composants/soupapaeDecharge';
const EquipementHydroMeca_API = API + '/composants/equipementHydroMeca';
const PostChloration_API = API + '/composants/postChloration';

@Injectable({
    providedIn: 'root'
})

export class ComposantService {

    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------


    saveSecurity(security) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(Security_API, security)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.security');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.security');
                    console.log(error);
                });

        });

    }

    savePriseEau(priseEau){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PriseEau_API, priseEau)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.priseEau');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.priseEau');
                    console.log(error);
                });

        });

    }
    saveEquipementStationTraitement(equipement){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(EquipementStationTraitement_API, equipement)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.equipement');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.equipement');
                    console.log(error);
                });

        });

    }

    saveKitMembrane(kit){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(KitMembrane_API, kit)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.kit');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.kit');
                    console.log(error);
                });

        });

    }

    saveStationPhp(station){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(StationPhp_API, station)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.station');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.station');
                    console.log(error);
                });

        });

    }

    saveLocalStockageChimique(local){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(LocalStockageChimique_API, local)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.local');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.local');
                    console.log(error);
                });

        });

    }

    saveBatimentElectrique(batiment){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(BatimentElectrique_API, batiment)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.batiment');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.batiment');
                    console.log(error);
                });

        });

    }

    saveGroupeElectrogene(groupe){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(GroupeElectrogene_API, groupe)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.groupe');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.groupe');
                    console.log(error);
                });

        });

    }

    savePostChimique(post){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PosteChimique_API, post)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.postChimique');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postChimique');
                    console.log(error);
                });

        });

    }

    savePostTrandformationElectrique(post){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PosteTransformationElectrique_API, post)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.postElectrique');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postElectrique');
                    console.log(error);
                });

        });

    }

    savePompe(pompe){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(GroupeElectroPompePompe_API, pompe)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.pompe');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.pompe');
                    console.log(error);
                });

        });

    }

    saveMoteur(moteur){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(GroupeElectroPompeMoteur_API, moteur)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.moteur');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.moteur');
                    console.log(error);
                });

        });

    }

    saveArmoire(armoire){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(ArmoireElectrique_API, armoire)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.armoire');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.armoire');
                    console.log(error);
                });

        });

    }

    saveAntiBelier(antiBelier){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(AntiBelier_API, antiBelier)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.antiBelier');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.antiBelier');
                    console.log(error);
                });

        });

    }

    saveSoupape(soupape){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(SoupapeDecharge_API, soupape)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.soupape');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.soupape');
                    console.log(error);
                });

        });

    }

    saveHydroMeca(equipementHydroMeca){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(EquipementHydroMeca_API, equipementHydroMeca)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.equipementHydroMeca');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.equipementHydroMeca');
                    console.log(error);
                });

        });

    }

    savePostChloration(postChloration){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();

            this.http.post(PostChloration_API, postChloration)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('TOAST.success.postChloration');
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postChloration');
                    console.log(error);
                });

        });

    }


}