import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router,private userService: UserService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    this.userService.decodeToken();
    if(this.userService.curUser.role=== expectedRole) return true;
    this.router.navigate([ '/' ]);
    return false;
  }
  
}