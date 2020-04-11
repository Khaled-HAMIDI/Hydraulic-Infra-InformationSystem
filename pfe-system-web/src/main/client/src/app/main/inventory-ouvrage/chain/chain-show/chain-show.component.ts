import { Component, OnInit, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ChainShowService } from "./chain-show.service";
import { Subject } from 'rxjs';
import { Chain } from './model/chain.model';



@Component({
  selector: 'app-chain-show',
  templateUrl: './chain-show.component.html',
  styleUrls: ['./chain-show.component.scss'],
  animations: fuseAnimations
})
export class ChainShowComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  private chain: Chain

  constructor(
    private chainShowService: ChainShowService,
    private route: ActivatedRoute,
    private fuseTranslationLoader: FuseTranslationLoaderService) {
    this._unsubscribeAll = new Subject();
    this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (response) => {

        this.chain = response.data[0];
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
