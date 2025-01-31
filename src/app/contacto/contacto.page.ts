import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false
})
export class ContactoPage implements OnInit {

  txt_nombre:string = "";
  txt_apellido:string = "";
  txt_telefono:string = "";
  txt_correo:string = "";
  cod_persona:string = "";
  txt_mensaje:string = "";

  constructor(
    private servicio: AccesoService,
    private navCtrl: NavController
  ) {
      this.servicio.getSession('cod_persona').then((res:any)=>{
        this.cod_persona = res;
      });
    }

  ngOnInit() {
  }

  cancelar(){
    this.navCtrl.back();
  }

  guardar(){
    let datos = {
      "action": 'nuevoc',
      "nombre": this.txt_nombre,
      "apellido": this.txt_apellido,
      "telefono": this.txt_telefono,
      "correo": this.txt_correo,
      "cod_persona": this.cod_persona
    }

    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.servicio.showToast(res.message, 2000);
        this.txt_nombre = "";
        this.txt_apellido = "";
        this.txt_telefono = "";
        this.txt_correo = "";
        this.servicio.showToast(res.message, 2000);
        this.navCtrl.back();
      }else{
        this.servicio.showToast(res.message, 2000);
      }
    })
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
        this.txt_mensaje = res.mensaje;
      }else{
        this.servicio.showToast(res.message, 2000);
      }
    })
  }

}
