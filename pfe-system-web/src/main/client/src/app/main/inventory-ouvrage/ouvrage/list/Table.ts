import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import isPlainObject from 'lodash/isPlainObject';
import remove from 'lodash/remove';
import indexOf from 'lodash/indexOf';

export class Table {

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    pageSizeOptions: number[];

    constructor(columnNames) {
        this.displayedColumns = columnNames;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Init function
    // -----------------------------------------------------------------------------------------------------
    initTable(columnData) {
        // Init DataSource
        this.dataSource = new MatTableDataSource(columnData);
        // Init Pagination
        this.dataSource.paginator = this.paginator;
        this.setPaginationOptions(this.dataSource.data.length);
        // Init Sort
        this.dataSource.sort = this.sort;
        // Init FilterPredicat
        this.dataSource.filterPredicate = this.filterPredicate;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Pagination function
    // -----------------------------------------------------------------------------------------------------
    setPaginationOptions(currentDataLength) {
        this.setPageSizeOptions(currentDataLength);
        this.setPageSize();
    }

    setPageSizeOptions(currentDataLength) {
        let pageSizeOptions = [10, 25, 50, 100, currentDataLength].sort(function (a, b) { return a - b; });
        let index = pageSizeOptions.indexOf(currentDataLength);

        this.pageSizeOptions = pageSizeOptions.slice(0, index + 1);
    }

    setPageSize() {
        const pageSize = this.pageSizeOptions[0];

        if (pageSize == 0) {
            this.paginator.hidePageSize = true;
            return;
        }

        this.paginator.hidePageSize = false;
        this.paginator._changePageSize(pageSize);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Filter function
    // -----------------------------------------------------------------------------------------------------
    filter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.setPaginationOptions(this.dataSource.filteredData.length);
        this.dataSource.paginator.firstPage();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------
    checkPage() {
        if (!this.dataSource.paginator.hasNextPage() && this.dataSource['_renderData'].value.length == 0)
            this.dataSource.paginator.previousPage();
    }

    filterPredicate(data, filter) {
        var properties = ["id"];
        var accumulator = function (currentTerm, key) {
            if (isPlainObject(data[key])) return currentTerm;
            return currentTerm + data[key];
        };

        var keys = remove(Object.keys(data), function (key) {
            return indexOf(properties, key) == -1;
        });

        var dataStr = keys.reduce(accumulator, '').toLowerCase();
        var transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) != -1;
    }

}
