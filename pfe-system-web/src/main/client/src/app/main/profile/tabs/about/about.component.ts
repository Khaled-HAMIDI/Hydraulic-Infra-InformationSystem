import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../../profile.service';
import { User, UserStructure } from 'app/main/model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy {

    user: User;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private profileService: ProfileService,
        private toolsService: ToolsService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.toolsService.loadTranslations(french, arabic);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.user = new User(about);
                console.log(this.user);
                
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
