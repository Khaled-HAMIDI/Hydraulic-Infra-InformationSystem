import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolsService } from '@ayams/services/tools.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { locale as arabic } from './i18n/ar';
import { locale as french } from './i18n/fr';
import { MatDialog } from '@angular/material';
import { PrintReportDialogComponent } from './dialog/print-report-dialog.component';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    animations: fuseAnimations
})
export class ReportComponent implements OnInit, OnDestroy {
    modules: any[] = [{ id: 1, value: 'USER', viewValue: 'Utilisateur', color: "#8bc34a" },
                      { id: 2, value: 'TOURS', viewValue: 'Tournées', color: "#cddc39" },];
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
        public dialog: MatDialog) {
        this.toolsService.loadTranslations(french, arabic);
        // Set the defaults
        this.currentModule = 'all';
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.filteredReports = this.reportsFilteredByModule = this.reports;
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
