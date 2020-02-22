import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseConfirmDialogModule} from '@fuse/components';
import {FuseWidgetModule} from '@fuse/components/widget/widget.module';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UsersSelectedBarComponent} from './list/selected-bar/selected-bar.component';
import {UserAddEditComponent} from './add-edit/user-add-edit.component';
import {UserListComponent} from './list/user-list.component';
import {UserShowComponent} from './show/user-show.component';
import {UserShowService} from './show/user-show.service';
import {UserAddEditService} from './add-edit/user-add-edit.service';
import {UserListService} from './list/user-list.service';
import {NotificationListComponent} from './notification/notification-list.component';
import {NotificationListService} from './notification/notification-list.service';
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes = [
    {
        path: 'add',
        component: UserAddEditComponent,
        data: {action: 'add'},
        resolve: {data: UserAddEditService}
    },
    {
        path: ':id/edit',
        component: UserAddEditComponent,
        data: {action: 'edit'},
        resolve: {data: UserAddEditService}
    },
    {
        path: ':id/show',
        component: UserShowComponent,
        resolve: {data: UserShowService}
    },
    {
        path: 'notificationsList',
        component: NotificationListComponent,
        resolve: {data: NotificationListService}
    },
    {
        path: '**',
        component: UserListComponent,
        resolve: {data: UserListService}
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSlideToggleModule,
        FormsModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        FuseWidgetModule,
        TranslateModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        MatToolbarModule,
        AyamsModule,
        NgxMaskModule.forRoot(options),

    ],
    declarations: [
        UserListComponent,
        UserAddEditComponent,
        UserShowComponent,
        UsersSelectedBarComponent,
        NotificationListComponent
    ]
})
export class UserModule {
}
