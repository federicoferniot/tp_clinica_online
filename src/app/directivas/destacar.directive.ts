import { Directive, ElementRef, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDestacar]'
})
export class DestacarDirective implements OnInit{

  @Input() value;

  constructor(private el:ElementRef) {

  }

  ngOnInit(){
    switch (this.value) {
      case 'cancelado':
        this.el.nativeElement.style.backgroundColor = "indianred";
        break;
      case 'aceptado':
        this.el.nativeElement.style.backgroundColor = "palegreen";
        break;
      case 'pendiente':
        this.el.nativeElement.style.backgroundColor = "orange";
        break;
      case 'finalizado':
        this.el.nativeElement.style.backgroundColor = "lightgray";
        break;
      default:
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.value){
      switch (this.value) {
        case 'cancelado':
          this.el.nativeElement.style.backgroundColor = "indianred";
          break;
        case 'aceptado':
          this.el.nativeElement.style.backgroundColor = "palegreen";
          break;
        case 'pendiente':
          this.el.nativeElement.style.backgroundColor = "orange";
          break;
        case 'finalizado':
          this.el.nativeElement.style.backgroundColor = "lightgray";
          break;
        default:
          break;
      }
    }
  }

}
