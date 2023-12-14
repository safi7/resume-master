// footer.component.ts
import { Component, OnInit } from '@angular/core';
import { SocialLoginService } from '@services/social-login.service';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main.component.html',
    styleUrls: ['./main.scss']
})
export class MainLayutComponent implements OnInit {

    constructor(
        private socilaS: SocialLoginService,
    ) { }

    on = {
        isDropdownVisible: false,
        year: 2023,
        user: null
    }

    ngOnInit() {
        const user = localStorage.getItem('user')
        if (user) {
            this.on.user = JSON.parse(user);
        }

    }
    // Add footer-related logic here


    onShowDropdown() {
        this.on.isDropdownVisible = true;
    }

    onHideDropdown() {
        this.on.isDropdownVisible = false;
    }

    onSignout() {
        // console.log('onSignout')
        this.socilaS.signOut()
        this.on.user = null;
    }
}


