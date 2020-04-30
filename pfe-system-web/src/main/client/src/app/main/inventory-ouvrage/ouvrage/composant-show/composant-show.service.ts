import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';

const Composant_API=API + '/ouvrage/';

@Injectable({
    providedIn: 'root'
})

export class ComposantShowService {

    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------


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