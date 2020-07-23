import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolsService } from '@ayams/services/tools.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { locale as arabic } from './i18n/ar';
import { locale as french } from './i18n/fr';
import { MatDialog } from '@angular/material';
import { PrintReportDialogComponent } from './dialog/print-report-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    animations: fuseAnimations
})
export class ReportComponent implements OnInit, OnDestroy {
    modules: any[] = [{ id: 1, value: 'USER', viewValue: 'Utilisateur', color: "#8bc34a" },
    { id: 2, value: 'TOURS', viewValue: 'Tournées', color: "#cddc39" },
    { id: 3, value: 'OUVRAGES', viewValue: 'Ouvrages', color: "#cddc39" }];
    reports: any[] = [
        {
            title: 'Planning globale des tournées', description: 'Edition globale triée par code de la tournée', moduleId: 2,
            api: "print/scheduledTour/globalState/{agencyCode}/{year}/{periodicity}/{period}",
            formInputs: [{ name: 'agencyCode', label: 'Code Agence', type: 'text' },
            { name: 'year', label: 'Année', type: 'number' },
            { name: 'periodicity', label: 'Periodicité', type: 'select', options: [{ value: 'MONTHLY', viewValue: 'Mensuelle' }, { value: 'QUARTERLY', viewValue: 'Trimestrielle' }] },
            { name: 'period', label: 'Periode', type: 'number' }
            ]
        },

        {
            title: "Fiche utilisateur", description: "Détails de l'utilisateur", moduleId: 1,
            api: "print/ficheUser/{code}",
            formInputs: [{ name: 'code', label: 'Code de l\'utilisateur', type: 'text' }]
        },
        {
            title: "Recap Ouvrage", description: "Recap sur les ouvrages", moduleId: 3,
            api: "print/OuvrageRecap",
            formInputs: [
                { name: 'wilaya', label: 'Wilaya', type: 'select', options: [{ value: 'null', viewValue: 'none' }, { value: '1', viewValue: 'Adrar' }] },
                { name: 'type', label: 'Type', type: 'select', options: [{ value: 'null', viewValue: 'none' }, { value: 'ENTIRI', viewValue: 'Entiri' },{ value: 'SEMIENTIRI', viewValue: 'SemiEntiri' },{ value: 'SURLEVE', viewValue: 'Surleve' },{ value: 'MONOBLOC', viewValue: 'Monoblocs' },{ value: 'ENDUR', viewValue: 'Endur'}] },
                { name: 'capacity_min', label: 'Capacité min', type: 'number' },
                { name: 'capacity_max', label: 'Capacité max', type: 'number' },
                { name: 'dater', label: 'Année de réalisation', type: 'number' },
                { name: 'dates', label: 'Année mise en service', type: 'number' },
                { name: 'role', label: 'Role', type: 'select', options: [{ value: 'null', viewValue: 'none' }, { value: 'TAMPON', viewValue: 'Tampon' },{ value: 'DISTRIBUTION', viewValue: 'Distribution' },{ value: 'BACHAHAUT', viewValue: 'Bacheahaut' },{ value: 'TES', viewValue: 'Traitement des eaux de surface' },{ value: 'DM', viewValue: 'Déminéralisation'},{ value: 'DF', viewValue: 'Deférrisation'}] },
                { name: 'state', label: 'Etat', type: 'select', options: [{ value: 'null', viewValue: 'none' }, { value: 'GOOD', viewValue: 'Bon' },{ value: 'AVERAGE', viewValue: 'Moyen'},{ value: 'BAD', viewValue: 'Mauvais'}] },
                { name: 'enabled', label: 'Fonctionnement', type: 'select', options: [{ value: 'null', viewValue: 'none' }, { value: 'ON', viewValue: 'Marche' },{ value: 'OFF', viewValue: 'Arret'}] },
                { name: 'cost_min', label: 'Cout min', type: 'number' },
                { name: 'cost_max', label: 'Cout max', type: 'number' },
            ]
        }
    ];

    reportsFilteredByModule: any[] = [{}];
    filteredReports: any[] = [{}];
    currentModule: string;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;
    dialogRef: any;

    constructor(private toolsService: ToolsService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router) {
        this.toolsService.loadTranslations(french, arabic);
        // Set the defaults
        this.currentModule = 'all';
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.filteredReports = this.reportsFilteredByModule = this.reports;
                console.log(response.data[0]);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    openPrintDialog(reportIndex: number): void {

        this.dialogRef = this.dialog.open(PrintReportDialogComponent, {
            width: '350px',
            minHeight: '100px',
            maxHeight: '360px',
            disableClose: true,
            data: {
                formInputs: this.filteredReports[reportIndex].formInputs,
                api: this.filteredReports[reportIndex].api
            }
        });
    }

    // Filter by category
    filterReportsByModule(): void {
        // Filter
        if (this.currentModule === 'all') {
            this.reportsFilteredByModule = this.reports;
            this.filteredReports = this.reports;
        }
        else {
            this.reportsFilteredByModule = this.reports.filter((report) => {
                const module = this.getModuleOfReport(report.moduleId)
                return module.value === this.currentModule;
            });

            this.filteredReports = [...this.reportsFilteredByModule];

        }

        // Re-filter by search term
        this.filterReportsByTerm();
    }

    // Filter by term
    filterReportsByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === '') {
            this.filteredReports = this.reportsFilteredByModule;
        }
        else {
            this.filteredReports = this.reportsFilteredByModule.filter((report) => {
                return (report.title.toLowerCase().includes(searchTerm) || report.description.toLowerCase().includes(searchTerm));
            });
        }
    }

    getModuleOfReport(id) {
        const module = this.modules.filter(module => module.id == id)
        return module[0];

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
