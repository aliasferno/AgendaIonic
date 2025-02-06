import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: false,
})
export class CuentaPage implements OnInit {
  txt_cedula:string = "";
  txt_nombre:string = "";
  txt_apellido:string = "";
  txt_correo:string = "";
  txt_clave:string = "";
  txt_cclave:string = "";
  mensaje:string = "";

  constructor(
    private servicio: AccesoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  vclave(){
    if(this.txt_clave != this.txt_cclave){
      this.mensaje = "Las contraseñas no coinciden";
    }else{
      this.mensaje = "";
    }
  }

  vcedula(){
    let datos = {
      action:'vcedula',
      cedula: this.txt_cedula
    }
    this.servicio.postData(datos).subscribe((res:any) => {
      if(!res.estado){
        this.txt_cedula="";
        this.servicio.showToast(res.mensaje, 3000);
      }
    });
  }

  registrar(){
    if(this.txt_cedula!="" && this.txt_nombre!="" && this.txt_correo!="" && this.txt_clave!="")
    {
      let datos = {
        action:'cuenta',
        cedula: this.txt_cedula,
        nombre: this.txt_nombre,
        apellido: this.txt_apellido,
        correo: this.txt_correo,
        clave: this.txt_clave
      }
      this.servicio.postData(datos).subscribe((res:any) => {
        if(res.estado){
          this.modalCtrl.dismiss();
          this.servicio.showToast(res.mensaje, 3000);
        }
        else{
          this.servicio.showToast(res.mensaje, 3000);
        }
      });
    }
    else{
      this.servicio.showToast('Faltan datos por llenar', 3000);
    }
  }

  cancelar(){
    this.modalCtrl.dismiss();
  }

}
