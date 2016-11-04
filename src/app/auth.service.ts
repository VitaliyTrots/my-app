import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {

    // Observable user role
    private userRole = new Subject<number>();
    userRole$ = this.userRole.asObservable();
    public changeUser() {
        this.userRole.next(this.userProfile == undefined?-1:this.userProfile["role"] == "admin"?1:this.userProfile["role"] == "user"?0:-1);
    }

    // Configure Auth0
    lock = new Auth0Lock('HzkLleYJ3Js0h5rz3pEVOHffcc32Atkr', 'vitaliy.eu.auth0.com', {closable: false});

    //Store profile object in auth class
    userProfile: Object;

    constructor() {
        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);

            // Fetch profile information
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
                this.changeUser();
            });
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
        this.changeUser();
    };

}
