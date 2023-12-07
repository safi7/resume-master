import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import MainMasterService from "@services/main-master-api.service";
import MessageService from "@services/message.service";
import { SocialLoginService } from "@services/social-login.service";
import _ from 'lodash';



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
        private router: Router,
        private mainapiS: MainMasterService
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
        const fields = ['email', 'name', 'provider', 'photoUrl']
        const user = this.socialLoginService.getSocialUser();
        const payload = {
            ..._.pick(this.socialLoginService.getSocialUser(), fields),
            provider: user.provider.toLowerCase(),
            username: user.id
        }
        this.mainapiS.authLogin(payload)
            .subscribe(res => {
                if (res) {
                    localStorage.setItem('jwt_token', res.token)
                    localStorage.setItem('user', JSON.stringify(_.omit(res, ['token'])))
                    return this.router.navigateByUrl(this.on.redirect)
                } else {
                    return this.displayMessage('error', 'Failed to login.')
                }
            }, err => {
                return this.displayMessage('error', 'Failed to login.')
            })
    }

    signInWithAccount() {
        const keys = this.on.signup ? ['username', 'password', 'name'] : ['username', 'password'];

        const valid = keys.some(k => !this.on[k])
        if (valid) {
            return this.displayMessage('error', 'Fill up required fields.')
        }

        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(this.on.username)) {
            return this.displayMessage('error', 'Please enter a valid email address.')
        }

        this.mainapiS.authLogin({ email: this.on.username, ..._.pick(this.on, ['name', 'username', 'signup', 'password']) })
            .subscribe(res => {
                console.log(res);
                if (res) {
                    localStorage.setItem('jwt_token', res.token)
                    localStorage.setItem('user', JSON.stringify(_.omit(res, ['token'])))
                    return this.router.navigateByUrl(this.on.redirect)
                } else {
                    return this.displayMessage('error', 'Failed to login.')
                }
            }, err => {
                return this.displayMessage('error', 'Failed to login.')
            })


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
        console.log('displayMessage1', message);
        this.messageS.updateEnvelop({ type, message });
        setTimeout(() => {
            this.messageS.restart()
        }, 3 * 1000);
    }

    signOut() {
        this.socialLoginService.signOut();
    }

}
