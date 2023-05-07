import {Injectable} from '@angular/core';
import {Role} from "../common/role";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {
  }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    // @ts-ignore
      return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem('jwtToken');
  }

  public setUserUid(id: string) {
    localStorage.setItem('userUid', id);
  }

  public getUserUid() {
    return localStorage.getItem('userUid');
  }

  // public getId(): string {
  //   // @ts-ignore
  //   return localStorage.getItem('id');
  // }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  isFunderRole(): boolean {
    for (const r of this.mapRolesFromLocalStorage()) {
      if (r.roleName === 'ROLE_FUNDER') {
        return true;
      }
    }
    return false;
  }


  isWorkerRole() {
    for (const r of this.mapRolesFromLocalStorage()) {
      if (r.roleName === 'ROLE_WORKER') {
        return true;
      }
    }
    return false;
  }

  isAdminRole() {
    for (const r of this.mapRolesFromLocalStorage()) {
      if (r.roleName === 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }

  isCeoRole() {
    for (const r of this.mapRolesFromLocalStorage()) {
      if (r.roleName === 'ROLE_CEO') {
        return true;
      }
    }
    return false;
  }

  isSgRole() {
    for (const r of this.mapRolesFromLocalStorage()) {
      if (r.roleName === 'ROLE_SG') {
        return true;
      }
    }
    return false;
  }
  mapRolesFromLocalStorage(): Role[] {
    const rolesFromLocalStorage = localStorage.getItem('roles');
    if (rolesFromLocalStorage !== null) {
      const rolesArray = JSON.parse(rolesFromLocalStorage);
      return rolesArray.map((role: { roleName: string, roleDescription: string }) => {
        return {
          roleName: role.roleName,
          roleDescription: role.roleDescription
        };
      });
    } else {
      return [];
    }
  }
}
