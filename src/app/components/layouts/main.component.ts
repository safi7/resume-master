// footer.component.ts
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-main-layout',
    templateUrl: './main.component.html',
    styleUrls: ['./main.scss']
})
export class MainLayutComponent implements OnInit {

    on = {
        isDropdownVisible: false,
        year: 2023
    }

    ngOnInit() {
    }
    // Add footer-related logic here


    onShowDropdown() {
        this.on.isDropdownVisible = true;
    }

    onHideDropdown() {
        this.on.isDropdownVisible = false;
    }
}
