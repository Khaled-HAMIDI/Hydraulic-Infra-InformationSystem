import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { User } from '../../../model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

const USERS_API = API + '/users';

@Injectable({
    providedIn: 'root'
})

export class UserListService implements Resolve<any>{

    users: User[];
    usersByFilter: User[];
    usersSelected: string[];

    onUsersChanged: Subject<any>;
    onSelectedUsersChanged: BehaviorSubject<any>;


    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {

        this.usersByFilter = [];
        this.usersSelected = [];
        this.onUsersChanged = new Subject();
        this.onSelectedUsersChanged = new BehaviorSubject([]);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.http.get(USERS_API)
                .subscribe((response: any) => {
                    this.users = response;
                    resolve(response);
                }, reject);
        });
    }

    reset(id: number): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.http.post(USERS_API + '/' + id + '/resetPassword', null)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    delete(ids: String[]): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.http.request('delete', USERS_API, { body: ids })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Selection function
    // -----------------------------------------------------------------------------------------------------
    toggleSelectedUser(user: User): void {
        const indexUserSelected = this.usersSelected.indexOf(user.id);
        indexUserSelected == -1 ? this.selectUser(user.id) : this.deselectUser(indexUserSelected);
    }

    selectUser(idUser: string, onEvent = true) {
        this.usersSelected.push(idUser);
        if (onEvent) this.onSelectedUsersChanged.next(this.usersSelected);
    }

    deselectUser(indexUserSelected: number, onEvent = true) {
        this.usersSelected.splice(indexUserSelected, 1);
        if (onEvent) this.onSelectedUsersChanged.next(this.usersSelected);
    }

    selectAll(): void {
        const usersToSelect = this.usersByFilter.length ? this.usersByFilter : this.users;
        this.usersSelected = [];

        usersToSelect.forEach(user => { this.selectUser(user.id, false); })

        this.onSelectedUsersChanged.next(this.usersSelected);
    }

    deselectAll(): void {
        this.usersSelected = [];
        this.onSelectedUsersChanged.next(this.usersSelected);
    }




    resetPassword(user): void {
        this.toolsService.showProgressBar();

        this.reset(user.id).then(
            (response) => {
                this.toolsService.hideProgressBar();
                this.toolsService.showSuccess('LIST.TOAST.success-reset');
            },
            (error) => {
                this.toolsService.hideProgressBar();
                this.toolsService.showError('LIST.TOAST.error-reset');
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Delete function
    // -----------------------------------------------------------------------------------------------------
    deleteUser(user): void {
        this.toolsService.showProgressBar();

        this.delete([user.id]).then(
            (response) => {

                const userIndex = this.users.indexOf(user);
                const indexUserSelected = this.usersSelected.indexOf(user.id);

                this.deleteFromUsers(userIndex);
                if (indexUserSelected != -1) this.deselectUser(indexUserSelected);

                this.toolsService.hideProgressBar();
                this.toolsService.showSuccess('LIST.TOAST.success-delete');

            },
            (error) => {
                console.log(error);
                this.toolsService.hideProgressBar();
                this.toolsService.showError('LIST.TOAST.error-delete');
            }
        );
    }

    deleteFromUsers(userIndex, onEvent = true) {
        this.users.splice(userIndex, 1);
        if (onEvent) this.onUsersChanged.next(this.users);
    }

    deleteSelectedUsers(): void {
        this.toolsService.showProgressBar();

        this.delete(this.usersSelected).then(
            (response: any) => {

                this.deleteFromSelectedUsers(this.usersSelected);
                this.onUsersChanged.next(this.users);
                this.deselectAll();

                this.toolsService.hideProgressBar();
                this.toolsService.showSuccess('LIST.TOAST.success-delete');

            },
            (error) => {
                console.log(error);
                this.toolsService.hideProgressBar();
                this.toolsService.showError('LIST.TOAST.error-delete');
            }
        );

    }

    deleteFromSelectedUsers(ids_to_delete) {
        for (const userId of ids_to_delete) {
            const user = this.users.find(_user => {
                return _user.id === userId;
            });
            this.deleteFromUsers(this.users.indexOf(user), false);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setUsersByFilter(usersByFilter: User[]) {
        this.usersByFilter = usersByFilter;
    }



    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getAll()
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    this.router.navigate(['**']);
                    resolve();
                }
            );
        });


    }


    exportDataXLS(properties) {
        var data;

        this.toolsService.showProgressBar();

        if (this.usersSelected.length) {
            data = this.getUsersSelected();
        }
        else if (this.usersByFilter.length) { data = this.usersByFilter; }
        else { data = this.users; }

        //remove reference
        data = JSON.parse(JSON.stringify(data));

        this.removeProperties(data, properties);
        this.replacePorperty(data);

        /* generate a worksheet */
        var ws = XLSX.utils.json_to_sheet(data);

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Utilisateurs");

        /* write workbook and force a download */
        XLSX.writeFile(wb, "Utilisateurs.xlsx");

        this.toolsService.hideProgressBar();
    }

    getUsersSelected() {
        var tab = [];

        for (var i = 0; i < this.usersSelected.length; i++) {
            const user = this.users.find(element => {
                return element.id === this.usersSelected[i];
            });
            tab.push(user);
        }

        return tab;

    }

    removeProperties(data, properties) {

        data.forEach(element => {
            for (var i = 0; i < properties.length; i++) {
                delete element[properties[i]];
            }
        });
    }

    replacePorperty(data) {
        forEach(data, function (element) {
            element.profils = map(element.profils).join('/');
        });
    }

}
