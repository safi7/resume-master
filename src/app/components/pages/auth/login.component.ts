import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import MessageService from "@services/message.service";
import { SocialLoginService } from "@services/social-login.service";



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss'],
})

export default class ResumeLoginComponent implements OnInit {

    on = {
        username: null,
        password: null,
        signup: false,
        name: null,
        redirect: null
    }

    constructor(
        private socialLoginService: SocialLoginService,
        private messageS: MessageService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.on.redirect = this.route.snapshot.queryParams.return ?? '/resume/list'
    }

    ngOnInit() {
    }

    signInWithFacebook() {
        this.socialLoginService.signInWithFacebook(res => {
            if (res) {
                this.handleSignin()
            } else {
                this.displayMessage('error', 'Fill up required fields.')
            }
        });
    }

    signInWithGoogle() {
        this.socialLoginService.signInWithGoogle(res => {
            if (res) {
                this.handleSignin()
            } else {
                this.displayMessage('error', 'Fill up required fields.')
            }
        });
    }

    handleSignin() {
        localStorage.setItem('jwt_token', JSON.stringify(this.socialLoginService.getSocialUser()))
        localStorage.setItem('user', JSON.stringify(this.socialLoginService.getSocialUser()))
        return this.router.navigateByUrl(this.on.redirect)
    }

    signInWithAccount() {
        const keys = this.on.signup ? ['username', 'password', 'name'] : ['username', 'password'];

        const valid = keys.some(k => !this.on[k])
        if (valid) {
            return this.displayMessage('error', 'Fill up required fields.')
        }

        console.log(this.on);
    }

    isUserLogged() {
        return this.socialLoginService.isUserLogged();
    }

    getUserName() {
        const socialUser = this.socialLoginService.getSocialUser();
        return socialUser ? socialUser.name : '';
    }

    displayMessage(type, message) {
        this.messageS.updateEnvelop({ type, message });
        setTimeout(() => {
            this.messageS.restart()
        }, 3 * 1000);
    }

    signOut() {
        this.socialLoginService.signOut();
    }

}
