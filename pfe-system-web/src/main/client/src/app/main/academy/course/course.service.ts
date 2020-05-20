import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TestSecurityComponent } from '../components/security/security.component';
import { TestEchelleComponent } from '../components/reservoir-et-brise-charge/echelle/echelle.component';
import { TestFlotteurComponent } from '../components/reservoir-et-brise-charge/flotteur/flotteur.component';

@Injectable()
export class AcademyCourseService implements Resolve<any>
{
    demoComponents = [
        {
            'title': 'Test Security Component',
            'ComponentName': 'TestSecurityComponent',
        },
        {
            'title': 'Test Echelle Component',
            'ComponentName': 'TestEchelleComponent',
        },
        {
            'title': 'Test Flotteur Component',
            'ComponentName': 'TestFlotteurComponent',
        }];
        
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCourse(route.params.courseId, route.params.courseSlug)
            ]).then(
                (data) => {
                    resolve({
                        courses: data[0],
                    });
                },
                reject
            );
        });
    }

    /**
     * Get course
     *
     * @param courseId
     * @param courseSlug
     * @returns {Promise<any>}
     */
    getCourse(courseId, courseSlug): Promise<any> {
        return new Promise((resolve, reject) => {
            // this._httpClient.get('api/academy-course/' + courseId + '/' + courseSlug)
            //     .subscribe((response: any) => {
            //         resolve(this.demoCourse);
            //     }, reject);
            resolve(this.demoComponents);
        });
    }

}

        export const componentMapping: { [key: string]: Type<any>; } = {
            'TestSecurityComponent': TestSecurityComponent,
            'TestEchelleComponent': TestEchelleComponent,
            'TestFlotteurComponent': TestFlotteurComponent,
        };