import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from "rxjs";

const Composant_API = API + '/ouvrage/';

@Injectable({
    providedIn: 'root'
})

export class ComposantGetService implements Resolve<any>{

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
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadPriseEau(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/priseEau/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }
    loadEquipementStationTraitement(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/equipementStationTraitement/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadKitMembrane(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/kitMembrane/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadStationPhp(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/stationPhp/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadLocalStockageChimique(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/localStockage/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadBatimentElectrique(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/batimentElectrique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadGroupeElectrogene(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/groupeElectrogene/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadPostChimique(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/postChimique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadPostTrandformationElectrique(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/postTransformationElectrique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadPompe(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/groupeElectroPompePompe/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadMoteur(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/groupeElectroPompeMoteur/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadArmoire(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/armoireElectrique/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadAntiBelier(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/antiBelier/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadSoupape(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/soupapeDecharge/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadHydroMeca(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/equipementHydroMeca/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadPostChloration(code) {
        return new Promise((resolve, reject) => {

            this.http.get(Composant_API + code + '/composants/postChloration/')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadState() {
        return new Promise((resolve, reject) => {

            this.http.get(API +'/enum/state')
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    reject(error);
                });

        });

    }

    loadSpecificComposant(typeOuvrage: string,code: string){
        switch (typeOuvrage) {

            case "StationTraitementConventionelle" :
            case "StationTraitementNonConventionelle":
                return [
                    this.loadSecurity(code),
                    this.loadPriseEau(code),
                    this.loadEquipementStationTraitement(code),
                    this.loadKitMembrane(code),
                    this.loadStationPhp(code),
                    this.loadLocalStockageChimique(code),
                    this.loadPostChimique(code),
                    this.loadBatimentElectrique(code),
                    this.loadGroupeElectrogene(code),
                    this.loadState()];

            case "Reservoir":
                return [
                    this.loadSecurity(code),
                    this.loadHydroMeca(code),
                    this.loadPostChloration(code),
                    this.loadState()];

            case "Forage":
                return [
                    this.loadSecurity(code),
                    this.loadPostTrandformationElectrique(code),
                    this.loadGroupeElectrogene(code),
                    this.loadPompe(code),
                    this.loadMoteur(code),
                    this.loadArmoire(code),
                    this.loadAntiBelier(code),
                    this.loadSoupape(code),
                    this.loadHydroMeca(code),
                    this.loadState() ];

            case "StationPompage":
                return [
                    this.loadSecurity(code),
                    this.loadPostTrandformationElectrique(code),
                    this.loadGroupeElectrogene(code),
                    this.loadPompe(code),
                    this.loadMoteur(code),
                    this.loadArmoire(code),
                    this.loadAntiBelier(code),
                    this.loadSoupape(code),
                    this.loadHydroMeca(code),
                    this.loadState()];

            case "BriseCharge":
                return [
                    this.loadSecurity(code),
                    this.loadHydroMeca(code),
                    this.loadPostChloration(code),
                    this.loadState() ];
        }

    }

    loadSpecificData(typeOuvrage: string,data: any){

        switch (typeOuvrage) {

            case "StationTraitementConventionelle":
            case "StationTraitementNonConventionelle":
                return {
                    securityData: data[0],
                    priseEauData: data[1],
                    equipementStationTraitemenData: data[2],
                    kitMembraneData: data[3],
                    stationPhpData: data[4],
                    localStockageChimiqueData: data[5],
                    postChimiqueData: data[6],
                    batimentElectriqueData: data[7],
                    groupeElectrogeneData: data[8],
                    stateData : data[9]};


            case "Reservoir":
                return {
                    securityData: data[0],
                    hydroMecaData: data[1],
                    postChlorationData: data[2],
                    stateData : data[3] };

            case "Forage":
                return {
                    securityData: data[0],
                    postTrandformationElectriqueData: data[1],
                    groupeElectrogeneData: data[2],
                    pompeData: data[3],
                    moteurData: data[4],
                    armoireData: data[5],
                    antiBelierData: data[6],
                    soupapeData: data[7],
                    hydroMecaData: data[8],
                    stateData : data[9] };

            case "StationPompage":
                return {
                    securityData: data[0],
                    postTrandformationElectriqueData: data[1],
                    groupeElectrogeneData: data[2],
                    pompeData: data[3],
                    moteurData: data[4],
                    armoireData: data[5],
                    antiBelierData: data[6],
                    soupapeData: data[7],
                    hydroMecaData: data[8],
                    stateData : data[9] };

            case "BriseCharge":
                return {
                    securityData: data[0],
                    hydroMecaData: data[1],
                    postChlorationData: data[2],
                    stateData : data[3] };

        }
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all(
                this.loadSpecificComposant(route.params['type'], route.params['code'])
            ).then(
                (data) => {
                    resolve(
                        this.loadSpecificData(route.url[1].path ,data)
                    );

                },
                reject
            );
        });
    }


}