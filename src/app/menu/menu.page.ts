import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage {

  nombre_persona:string = "";
  contactos: any = [];
  cod_persona:string = "";

  constructor(
    private navCtrl: NavController,
    private servicio: AccesoService
  ) {
      this.servicio.getSession('persona_nombre').then((res:any)=>{
      this.nombre_persona = res;
    });
    this.servicio.getSession('cod_persona').then((res:any)=>{
      this.cod_persona = res;
      this.lcontactos();
    });
  }
  lcontactos(){
    let datos = {
      "action": 'lcontactos',
      "codigo": this.cod_persona
    }

    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.contactos = res.data;
      }else{
        this.servicio.showToast(res.message, 2000);
      }
    })
  }

  nuevo(){
    this.navCtrl.navigateRoot(['contacto']);
  }

  irEditar(cod_contacto:string){
    console.log("cod_contacto");
    console.log(cod_contacto);
    this.navCtrl.navigateRoot(['acontacto']);
    this.servicio.createSesion('cod_contacto', cod_contacto);
  }

  irEliminar(cod_contacto:string){
    this.navCtrl.navigateRoot(['econtacto']);
    this.servicio.createSesion('cod_contacto', cod_contacto);
  }
  editarPerfil(){
    this.navCtrl.navigateRoot(['aperfil']);
    this.servicio.createSesion('cod_persona', this.cod_persona);
  }
  cerrarSesion(){
    this.servicio.closeSession();
    this.navCtrl.navigateRoot(['home']);
  }

}
