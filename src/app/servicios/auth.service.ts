import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { UsuarioService } from './usuario.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private info;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router, private usuarioService: UsuarioService) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }

  getAuth(){
    return this.afAuth;
  }

  infoUsuario(){
    return this.info;
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    localStorage.setItem('user', JSON.stringify(result.user));
  }

  setUserInfo(info){
    this.info = info;
  }

  getUserRole(){
    return this.info.role;
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
  }
  async register(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async sendVerificationEmail(){
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  get userLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthorized(allowedRoles: string[]): boolean{
    if(allowedRoles == null || allowedRoles.length === 0){
      return true;
    }
    if(this.info == null) return false;
    return allowedRoles.includes(this.info.role);
  }
}
