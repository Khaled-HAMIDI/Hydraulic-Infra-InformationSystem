import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/main/authentication/authentication.service';
import indexOf from 'lodash/indexOf';
import some from 'lodash/some';
import every from 'lodash/every';
import split from 'lodash/split';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private authenticationService: AuthenticationService
  ) { }


  somePermitted(authorizationsNeeded: string[]) {
    return some(authorizationsNeeded, (value) => {
      return this.isPermitted(value);
    });
  }

  allPermitted(authorizationsNeeded: string[]) {
    return every(authorizationsNeeded, (value) => {
      return this.isPermitted(value);
    });
  }

  /*
    Cherche une PERMISSION NECESSAIRE dans la liste des PERMISSION de l'UTILISATEUR
    Format des permission:
      - NECESSAIRE : 'LVL1' | 'LVL1:LVL2'
      - UTILISATEUR: 'LVL1:LVL2'
    
    Fonctionnement : 
      1 - Compare: LVL1(USER) & LVL1(NECESSAIRE)
        Cas 1 : (Pas de Concordance) -> passer a une autre permission de l'UTILISATEUR
        Cas 2 : (Concordance) -> continuer vers le LVL2

      2 - Compare: LVL2(USER) & LVL2(NECESSAIRE)
        Cas 1 : LVL2(NECESSAIRE) inexistant  -> return true; passer a une autre permission de l'UTILISATEUR
        Cas 2 : LVL2(NECESSAIRE) existant -> Compare: LVL2(USER) & LVL2(NECESSAIRE)
          - Cas 1 : (Pas de Concordance) -> passer a une autre permission de l'UTILISATEUR
          - Cas 2 : (Concordance) -> return true; passer a une autre permission de l'UTILISATEUR
  */
  private isPermitted(authorizationSearched: string): boolean {

    let authorizationsUser: string[] = this.authenticationService.getPermissions();

    let authorizationsSearchedTab = split(authorizationSearched, ':');
    let isSecondLvlExist = authorizationsSearchedTab.length >= 2;

    for (let i = 0; i < authorizationsUser.length; i++) {

      let authorizationUserTab = split(authorizationsUser[i], ':');

      let firstCheck = this.checkFirstLvl(authorizationsSearchedTab[0], authorizationUserTab[0]);

      if (!firstCheck) continue;

      if (!isSecondLvlExist) return true;

      let secondCheck = this.checkSecondLvl(authorizationsSearchedTab[1], authorizationUserTab[1]);

      if (secondCheck) return true;

    }

    return false;
  }

  // Check the first lvl: LVL1:LVL2
  private checkFirstLvl(lvlSearched, lvlUser) {
    return (lvlUser == "*" || lvlUser == lvlSearched);
  }

  // Check the second lvl: LVL1:LVL2
  private checkSecondLvl(actionSearched, actionsUser) {
    return (actionsUser == "*" || indexOf(split(actionsUser, ','), actionSearched) != -1);
  }
}
