import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { User, Center, Agency, Role } from '../../../model/admin.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { UserAddEditService } from './user-add-edit.service';
import { AyamsValidators } from '@ayams/validators';
import sortBy from 'lodash/sortBy';
import pullAllBy from 'lodash/pullAllBy';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { MatOption } from '@angular/material';


@Component({
  selector: 'user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
  animations: fuseAnimations
})
export class UserAddEditComponent implements OnInit, OnDestroy {
  public customPatterns = { 'A': { pattern: new RegExp('[a-z.%-]') } };

  private _unsubscribeAll: Subject<any>;
  user: User;
  pageType: string;
  userForm: FormGroup;
  centers: Center[];
  agencies: Agency[];
  filtredAgencies: Agency[];
  showAgencies: boolean = false;
  checked: boolean = true;
  allRoles: Role[];
  immuableAllRoles: Role[];
  username: string;
  emailSuffix = "@ade.dz";
  constructor(
    private userAddEditService: UserAddEditService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fuseTranslationLoader: FuseTranslationLoaderService) {

    this._unsubscribeAll = new Subject();
    this.user = new User();
    this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response) => {
        this.centers = response.data[1];
        this.immuableAllRoles = cloneDeep(response.data[2]);
        this.initForm(response.data[0], response.action);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  createUserForm(): FormGroup {
    this.user.enabled = (this.user.enabled != undefined) ? this.user.enabled : true;
    let obj = {
      id: [this.user.id],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email],
      phoneNumber: [this.user.phoneNumber, AyamsValidators.phoneFormatValidator()],
      enabled: [this.user.enabled, Validators.required],
      roles: [this.user.roles, this.rolesValidator()],
      agency: ['-1', AyamsValidators.requiredAndNotEmptyObjectValidator()],
      center: ['-1', AyamsValidators.requiredAndNotEmptyObjectValidator()],
      employeeCode: [this.user.employeeCode, Validators.required]
    };

    if (this.pageType == 'edit') {
      switch (this.user.structure.type) {
        case 'Centre':
          obj['center'] = [this.user.structure.id, Validators.required];
          break;
        case 'Agence':
          obj['agency'] = [this.user.structure.id, Validators.required];
          obj['center'] = [this.user.structure.parentStructure.id, Validators.required];
          break;
      }
    }

    return this.formBuilder.group(obj);

  }

  onSave(): void {
    const user = this.userForm.getRawValue();
    console.log(user);

    user.roles = this.user.roles;

    var roleIds = [];
    user.roles.forEach((role) => { roleIds.push(role.id) });
    user.roles = roleIds;

    if (user.agency != '-1') {
      user['structure'] = user.agency;
    } else if (user.center != '-1') {
      user['structure'] = user.center;
    } else {
      user['structure'] = null;
    }

    delete user["agency"];
    delete user["center"];
    if (this.pageType == 'add') {
      user.email += this.emailSuffix;
    }
    else {
      if (user.email != this.user.email) {
        user.email += this.emailSuffix;
      }
    }

    this.userAddEditService.saveUser(user)
      .then(() => {
        if (user.id)
          this.router.navigate(['/admin/users']);
        else

          this.initForm(false, "add");
      });
  }

  initForm(user, action) {
    this.pageType = action;
    this.allRoles = cloneDeep(this.immuableAllRoles);

    if (this.pageType == 'edit') {
      this.user = new User(user);

      this.allRoles.forEach(element => {
        delete element.authorities;
      });

      this.allRoles = pullAllBy(this.allRoles, this.user.roles, 'id');

      if (this.user.structure.type == 'Agence') {
        this.showAgencies = true;
        this.userAddEditService.getAgenciesWithCenterId(this.user.structure.parentStructure.id).then(
          (response: Agency[]) => {
            this.filtredAgencies = response;
          });
      } else {
        this.showAgencies = false;
      }
    } else {
      this.user = new User();
      this.showAgencies = false;
      this.username = '';

    }
    this.userForm = this.createUserForm();
    this.initFilteredRoles();

  }

  getCenters(): void {
    this.userAddEditService.getCenters().then(
      (response: Center[]) => {
        this.centers = response;

      });
  }

  filterAgencies(centerId): void {

    if (centerId == -1) {
      this.showAgencies = false;
      return;
    }
    if (centerId) {
      this.userAddEditService.getAgenciesWithCenterId(centerId).then(
        (response: Agency[]) => {

          this.filtredAgencies = response;
        });
      this.showAgencies = true;
    } else {
      this.showAgencies = false;
    }
  }

  toggle(): void {
    this.user.enabled = !this.user.enabled;
  }


  // Chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRoles: Observable<Role[]>;


  @ViewChild('roleInput', { static: false }) roleInput: ElementRef;

  initFilteredRoles() {
    this.filteredRoles = this.userForm.get('roles').valueChanges.pipe(
      startWith(''),
      map((filterValue: string | null) => {
        return filterValue ? this._filter(filterValue) : sortBy(this.allRoles.slice(), ['role']);
      }));


  }

  add(event: MatChipInputEvent): void {
    const input = event.input;

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userForm.get('roles').setValue(null);

  }

  remove(rolee: Role): void {
    const index = this.user.roles.indexOf(rolee);

    if (index >= 0) {
      this.user.roles.splice(index, 1);
      this.allRoles.push(rolee);
    }
    this.userForm.get('roles').setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let rolee = event.option.value;

    this.user.roles.push(rolee);
    this.removeFromAllRoles(rolee);

    this.userForm.get('roles').setValue(null);
  }

  removeFromAllRoles(role: Role) {
    const index = this.allRoles.indexOf(role);

    if (index >= 0) {
      this.allRoles.splice(index, 1);
    }
  }

  private _filter(value: any): Role[] {
    const filterValue = value.role ? value.role.toLowerCase() : value.toLowerCase();
    return this.allRoles.filter(
      role => role.role.toLowerCase().includes(filterValue)
    );
  }

  rolesValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {

      const forbidden = this.user.roles.length != 0;
      return !forbidden ? { 'forbiddenName': { value: this.user.roles } } : null;

    };

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  setUsername(event) {
    this.username = (event.target.value).split('@')[0];
  }

}
