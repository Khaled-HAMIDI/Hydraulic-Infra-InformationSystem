import { Component, OnInit, OnDestroy } from '@angular/core';
import { Role } from '../../../model/admin.model';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Subject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'profil-show',
  templateUrl: './profil-show.component.html',
  styleUrls: ['./profil-show.component.scss'],
  animations: fuseAnimations
})
export class ProfilShowComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  profil: Role;

  constructor(private route: ActivatedRoute, private fuseTranslationLoader: FuseTranslationLoaderService) {
    this._unsubscribeAll = new Subject();
    this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  ngOnInit() {

    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response) => {

        this.profil = response.data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
