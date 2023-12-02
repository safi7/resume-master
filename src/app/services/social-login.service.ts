// social-login.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
    providedIn: 'root',
})
export class SocialLoginService {
    private socialUser: SocialUser;
    private isLogged: boolean;

    constructor(
        private authService: SocialAuthService,
        private router: Router
    ) { }

    signInWithFacebook(cb: (success: boolean) => void) {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
            (userData) => {
                this.socialUser = userData;
                this.isLogged = true;
                cb(true)
                // You can handle the login success here, e.g., send the user data to your server
            },
            (error) => {
                console.error('Facebook login failed', error);
                cb(false)
            }
        );
    }

    signInWithGoogle(cb: (success: boolean) => void) {
        console.log('this.authService', this.authService);
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            (userData) => {
                this.socialUser = userData;
                this.isLogged = true;
                cb(true)
                // You can handle the login success here, e.g., send the user data to your server
            },
            (error) => {
                console.error('Google login failed', error);
                cb(false)
            }
        );
    }

    signOut() {
        if (this.socialUser) {
            this.authService.signOut().then(
                () => {
                    this.handleSignout()
                },
                (error) => {
                    console.log(error)
                }
            );
        } else {
            this.handleSignout()
        }

    }

    handleSignout() {
        this.socialUser = null;
        this.isLogged = false;
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('user')
        window.open('/resume/list', '_self')
    }

    getSocialUser(): SocialUser {
        return this.socialUser;
    }

    isUserLogged(): boolean {
        return this.isLogged;
    }
}
