import { Component, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements AfterViewInit {
  @Input() icon: string; // icomoon icon class for button
  @Input() iconRight: string;
  @Input() btnClass: string;
  @Input() disabled: boolean; // Toggle Disabled attribute

   // Size of button (sm, '', lg)
   private _size = '';

   get size(): string {
     return this._size;
   }

   @Input()
   set size(val: string) {
     this._size = (val) ? 'btn-' + val : '';
   }

  constructor(private cdr: ChangeDetectorRef) {
    // this.cdr.detach();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.cdr.detectChanges();
    // }, 1);
  }

  // icon = 'add';
  // iconRight = 'arrow_forward';
  // btnClass = 'fake';
}
