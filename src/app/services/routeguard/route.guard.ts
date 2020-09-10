import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from '../base.service';
import { isNullOrUndefined } from 'util';

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
    currentUser: any;

    constructor(
        private router: Router,
        private baseService: BaseService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.currentUser = this.baseService.getLoggedInUser();

        if (route.routeConfig.path === 'create/ad-account' &&
            !isNullOrUndefined(this.currentUser.roles.find(e => e.authority === 'ROLE_ADMIN' ||
                e.authority === 'AD_WRITE' || e.authority === 'IFS_WRITE'
                || e.authority === 'PB_WRITE'))) {
                    return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
