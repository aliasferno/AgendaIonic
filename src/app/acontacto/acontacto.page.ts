import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-acontacto',
  templateUrl: './acontacto.page.html',
  styleUrls: ['./acontacto.page.scss'],
  standalone: false
})
export class AcontactoPage implements OnInit {

  txt_nombre:string = "";
  txt_apellido:string = "";
  txt_telefono:string = "";
  txt_correo:string = "";
  cod_contacto:string = "";
  lbl_mensaje:string = "";
  cod_persona:string = "";
  contactos:any = [];

  constructor(
    private servicio: AccesoService,
    private navCtrl: NavController)
  {
    this.servicio.getSession('cod_persona').then((res:any)=>{
      this.cod_persona = res;
    });
    this.servicio.getSession('cod_contacto').then((res:any)=>{
      this.cod_contacto = res;
      this.cargarDatos();
    });
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
        this.servicio.showToast(res.mensaje, 2000);
      }
    })
  }

  cancelar(){
    this.navCtrl.navigateRoot('/menu');
  }
  guardar(){
    let datos = {
      "action": 'acontacto',
      "cod_contacto":this.cod_contacto,
      "nombre": this.txt_nombre,
      "apellido": this.txt_apellido,
      "telefono": this.txt_telefono,
      "correo": this.txt_correo
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

  ngOnInit() {
  }

  verificarnumero(){

    let datos = {
      "action": 'vtelefono',
      "cod_persona":this.cod_persona,
      "telefono": this.txt_telefono
    }

    this.servicio.postData(datos).subscribe((res:any)=>{
      console.log("verificar telefono");
      console.log(res);
      if(res.estado){
        this.lbl_mensaje = res.mensaje;
      }else{
        this.servicio.showToast(res.mensaje, 2000);
      }
    })
  }
}
