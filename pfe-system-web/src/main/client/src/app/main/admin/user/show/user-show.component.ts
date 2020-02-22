import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../model/admin.model';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Subject } from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss'],
  animations: fuseAnimations
})

export class UserShowComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  user: User;

  constructor(private route: ActivatedRoute, private fuseTranslationLoader: FuseTranslationLoaderService) {
    this._unsubscribeAll = new Subject();
    this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  ngOnInit() {

    this.route.data.subscribe(
      (response) => {

        this.user = response.data[0];
      },
      (error) => {
        console.log('inside ngOnInit of the show component');
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
