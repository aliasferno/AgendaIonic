import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-econtacto',
  templateUrl: './econtacto.page.html',
  styleUrls: ['./econtacto.page.scss'],
  standalone:false
})
export class EcontactoPage implements OnInit {

  txt_nombre:string = "";
  txt_apellido:string = "";
  txt_telefono:string = "";
  txt_correo:string = "";
  cod_contacto:string = "";
  lbl_mensaje:string = "";
  contactos:any = [];
  public botones = [
    {
      text: 'No',
      role: 'alert_button_cancel',
      handler: () => {
        this.cancelar();
      },
    },
    {
      text: 'Si',
      role: 'alert-button-confirm',
      handler: () => {
        this.eliminar();
      },
    },
  ];

  constructor(
    private servicio: AccesoService,
    private navCtrl: NavController) {
      this.servicio.getSession('cod_contacto').then((res:any)=>{
        console.log(res);
        this.cod_contacto = res;
        this.cargarDatos();
      });
    }

  ngOnInit() {
  }
  cargarDatos(){
    let datos = {
      "action":"dcontacto",
      "cod_contacto":this.cod_contacto
    }

    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.contactos = res.data;
        this.txt_nombre = this.contactos.nombre;
        this.txt_apellido = this.contactos.apellido;
        this.txt_telefono  = this.contactos.telefono;
        this.txt_correo = this.contactos.correo;
      }else{
        this.servicio.showToast(res.message, 2000);
      }
    })
  }

  cancelar(){
    this.navCtrl.navigateRoot('/menu');
  }

  eliminar(){
    let datos = {
      "action":"econtacto",
      "cod_contacto":this.cod_contacto
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.servicio.showToast(res.mensaje, 2000);
        this.navCtrl.navigateRoot('/menu');
      }else{
        this.servicio.showToast(res.mensaje, 2000);
      }
    })
  }

}
