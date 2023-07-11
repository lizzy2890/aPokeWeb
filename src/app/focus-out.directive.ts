import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appFocusOut]'
})
export class FocusOutDirective {
  @Output() onFocusOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFocusIn: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
  @Input() elementsInBox!: string[];
  camouflage: boolean = false;
  show: boolean = false;


  constructor() { }

  @HostListener('focusout', ['$event'])
  public checkFocusOut(event: UIEvent): void {
    this.camouflage = true;
    this.onFocusOut.emit(this.camouflage);
  }

  @HostListener('focusin', ['$event'])
  public checkFocusIn(event: UIEvent): void {
    const target = event.target as HTMLElement;
    if(target.id && this.elementsInBox.includes(target.id))
    {
      this.camouflage = false;
      this.show = true;
    }
    else {
      this.camouflage = true;
      this.show = false;
    }
    this.onFocusIn.emit([this.camouflage, this.show]);
  }
  //missing case: when comming back to searchbox from outside and click in where x is, it'll show it and erase the word  
}
