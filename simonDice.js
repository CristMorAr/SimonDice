const tiempo = document.getElementById('tiempo')
const nivel = document.getElementById('nivel')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const rojo = document.getElementById('rojo')
const amarillo = document.getElementById('amarillo')
const btnEmpezar = document.getElementById ('btnEmpezar')
const tableroPuntos = document.getElementById('tableroPuntos')
const ULTIMO_NIVEL = 12
var crono

document.getElementById("nombre").innerHTML = nombre

class Juego{
  constructor(){
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 1000)
  }

  actPantalla() {
      nivel.innerText = this.nivel;
      tiempo.innerText = this.tiempo;
    }


  inicializar (){
    this.siguienteNivel = this.siguienteNivel.bind(this) //De esta forma dejamos atado "this" al contexto de "juego".
    this.elegirColor = this.elegirColor.bind(this)
    this.toogleBtnEmpezar()
    this.tiempo = 15;
    this.nivel = 1;
    this.contador = 15;
    this.colores ={
      celeste,
      violeta,
      naranja,
      verde,
      rojo,
      amarillo
    }
    this.actPantalla()
  }

    toogleBtnEmpezar(){
      if(btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove('hide')
      }  else {
          btnEmpezar.classList.add ('hide')
        }
    }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 6))
  }

    siguienteNivel(){
      document.getElementById("nivel").innerHTML = this.nivel;
      this.temporizador();
      this.subnivel = 0;
      this.contador = 15;
      this.actPantalla();
      this.iluminarSecuencia()
      this.recibirClick()
    }


    transNumAColor(num){
      switch (num){
        case 0:
            return 'celeste'
        case 1:
            return 'violeta'
        case 2:
            return 'naranja'
        case 3:
            return 'verde'
        case 4:
            return 'rojo'
        case 5:
            return 'amarillo'

      }
    }

    transColorANum(color){
      switch (color){
        case 'celeste':
            return 0
        case 'violeta':
            return 1
        case 'naranja':
            return 2
        case 'verde':
            return 3
        case 'rojo':
            return 4
        case 'amarillo':
            return 5

      }
    }

    temporizador() {
    clearInterval(this.crono);
    this.crono = setInterval(() => {
      this.contador--;
      if (this.contador == 0) {
        clearInterval(this.crono);
        this.perdioJuego();
      } else {
        tiempo.innerText = this.contador;
      }
    }, 1000);
  }

  iluminarSecuencia(){
   for (let i=0; i < this.nivel; i++){
     const color = this.transNumAColor (this.secuencia[i])
         setTimeout(() => this.iluminarColor(color), 500* i)
   }
  }

          iluminarColor(color){
            this.colores[color].classList.add('light')
              if(this.nivel <=4){
                setTimeout(() => this.apagarColor (color), 230)
              }else   if(this.nivel <=8){
                setTimeout(() => this.apagarColor (color), 130 )
              }else if(this.nivel = 12){
                setTimeout(() => this.apagarColor (color), 50 )
              }
            }

          apagarColor(color) {
            this.colores[color].classList.remove('light')
          }

          recibirClick(){
            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.rojo.addEventListener('click', this.elegirColor)
            this.colores.amarillo.addEventListener('click', this.elegirColor)

          }

          eliminarEventosClick(){
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.rojo.removeEventListener('click', this.elegirColor)
            this.colores.amarillo.removeEventListener('click', this.elegirColor)

          }

        elegirColor(ev){
            const nombreColor = ev.target.dataset.color // De esta manera se le asigna el color del boton elegido para comprobar si es correcto o no.
            const numColor = this.transColorANum(nombreColor)
            this.iluminarColor(nombreColor)
            if(numColor === this.secuencia[this.subnivel]){ //Aquí se hace la comprobación del color elegido.
              this.subnivel++ //Aquí se añade un nivel si la verificación es correcta.
              if(this.subnivel === this.nivel){ //Aquí se comprueba si el nivel y el subnivel coinciden.
                setTimeout(this.nivel++, 700) // si coinciden el nivel se aumenta.
                this.eliminarEventosClick
                if (this.nivel == (ULTIMO_NIVEL + 1)){
                  this.ganoJuego()
                }else{
                setTimeout(this.siguienteNivel, 1300) //Aquí solo hacemos referencia a la función, no se está invocando con ().
                if(this.nivel ===4){
                  swal({
                    text: "Bien!, ahora más rápido!",
                    icon: "success",
                    timer: 700,
                    buttons: false,
                  });
                }else if(this.nivel ===8){
                    swal({
                      text: "Bien!, ahora aun más rápido!",
                      icon: "success",
                      timer: 700,
                      buttons: false,
                    });
                  }else if(this.nivel ===12){
                      swal({
                        text: "Bien!, ahora al máximo!",
                        icon: "success",
                        timer: 700,
                        buttons: false,
                      });
                    }
              }
            }
          } else {
            clearInterval(this.crono);
            this.perdioJuego()
          }
        }

                ganoJuego(){
                  swal('Simon Dice', 'Ganaste!','success' )
                    this.inicializar
                }


                perdioJuego() {
                  swal('Simon Dice',`Has perdido, llegaste al nivel ${this.nivel}.`,'error' )
                  .then(() => {
                    this.eliminarEventosClick()
                    this.inicializar()
                  })
        }
      }

  function empezarJuego (){
    window.juego = new Juego ()
  }
