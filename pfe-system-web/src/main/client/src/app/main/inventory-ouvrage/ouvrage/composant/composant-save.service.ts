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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.security');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.priseEau');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.equipement');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.kit');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.station');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.local');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.batiment');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.groupe');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postElectrique');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.pompe');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.moteur');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.armoire');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.antiBelier');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.soupape');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.equipementHydroMeca');
                    console.log(error);
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
                }, (error : any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('TOAST.error.postChloration');
                    console.log(error);
                });

        });

    }


    loadSecurity(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/security/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadPriseEau(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API+ code + '/composants/priseEau/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }
    loadEquipementStationTraitement(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API+ code + '/composants/equipementStationTraitement/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadKitMembrane(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API+ code + '/composants/kitMembrane/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadStationPhp(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API+ code + '/composants/stationPhp/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadLocalStockageChimique(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/localStockage/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadBatimentElectrique(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/batimentElectrique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadGroupeElectrogene(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/groupeElectrogene/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadPostChimique(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/postChimique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadPostTrandformationElectrique(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/postTransformationElectrique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadPompe(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/groupeElectroPompePompe/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadMoteur(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/groupeElectroPompeMoteur/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadArmoire(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/armoireElectrique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadAntiBelier(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/antiBelier/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadSoupape(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/soupapeDecharge/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadHydroMeca(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/equipementHydroMeca/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }

    loadPostChloration(code){
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/postChloration/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    reject(error);
                });

        });

    }


}
