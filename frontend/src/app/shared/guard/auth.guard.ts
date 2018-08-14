import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UsersService} from "../../providers/users.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UsersService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isAuth()) {
      return true
    } else {
      this.router.navigate(['/login']);
    }

  }
}
