import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  server: string = "http://localhost/ionic/AGENDAws/agenda.php";
  constructor(
    public ToastCtrl: ToastController,
    public http: HttpClient
  ) { }

  postData(body:any){
    let head = new HttpHeaders({'Content-Type':'application/json, charset:utf8'});
    let options = {
      headers: head
    };
    return this.http.post(this.server, JSON.stringify(body), options);
  }

  async showToast(mensaje: string, tiempo: number){
    const toast = await this.ToastCtrl.create({
      message: mensaje,
      duration: tiempo,
      position: 'top'
    });
    toast.present();
  }

  async createSesion(id: string, valor: string){
    await Preferences.set({key: id, value: valor});
  }

  async getSession(id:string){
    const item = await Preferences.get({key: id});
    return item.value;
  }

  async closeSession(){
    await Preferences.clear();
  }
}
