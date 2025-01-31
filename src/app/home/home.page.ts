import { Component } from '@angular/core';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { CuentaPage } from '../cuenta/cuenta.page';
import { RclavePage } from '../rclave/rclave.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_usuario:string="";
  txt_clave:string="";
  intentosFallidos: number = 0;
  cuentaBloqueada: boolean = false;
  tiempoBloqueo: number = 30; // Segundos de bloqueo
  tiempoRestante: number = 0;
  constructor(
    private loadingCtrl: LoadingController,
    private servicio: AccesoService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  async login(){
    if (this.cuentaBloqueada) {
      this.servicio.showToast(`Cuenta bloqueada. Espere ${this.tiempoRestante} segundos`, 2000);
      return;
    }
    const loading = await this.showLoading();
    let datos = {
      action: 'login',
      usuario: this.txt_usuario,
      clave: this.txt_clave
    }

    this.servicio.postData(datos).subscribe({
      next: (res: any) => {
        console.log("Respuesta:", res);
        loading.dismiss();
        if (res.estado) {
          this.servicio.createSesion('cod_persona', res.persona.codigo);
          this.servicio.createSesion('persona_nombre', res.persona.nombre);
          this.navCtrl.navigateRoot('/menu');
        } else {
          this.manejarIntentoFallido();
          this.servicio.showToast('Datos incorrectos', 3000);
        }
      },
      error: (err) => {
        loading.dismiss();
        this.manejarIntentoFallido();
        this.servicio.showToast('Error de conexión', 3000);
        console.error("Error en la solicitud:", err);
      }
    });
  }
  private manejarIntentoFallido() {
    this.intentosFallidos++;
    
    if (this.intentosFallidos >= 3) {
      this.bloquearCuentaTemporalmente();
    }
  }
  private bloquearCuentaTemporalmente() {
    this.cuentaBloqueada = true;
    this.tiempoRestante = this.tiempoBloqueo;
  
    const intervalo = setInterval(() => {
      this.tiempoRestante--;
      
      if (this.tiempoRestante <= 0) {
        clearInterval(intervalo);
        this.cuentaBloqueada = false;
        this.intentosFallidos = 0;
      }
    }, 1000);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesion...',
      spinner: 'crescent',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }

  async crear(){

    const modal = await this.modalCtrl.create({
      component: CuentaPage
    });

    return await modal.present();

  }

  async recuperar(){
    const modal = await this.modalCtrl.create({
      component: RclavePage
    });

    return await modal.present();
  }

}
