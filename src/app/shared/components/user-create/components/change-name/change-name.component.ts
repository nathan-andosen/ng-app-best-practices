import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';


/**
 * Change a name of a user.
 *
 * This component is better aligned with best practices, it's different to the
 * way the change-address component is coded. This component is more of a dumb
 * component and will be easier to test.
 *
 * @export
 * @class ChangeNameComponent
 */
@Component({
  selector: 'app-user-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeNameComponent {
  @Input() name: string;
  @Output() nameChanged: EventEmitter<string> = new EventEmitter();


  /**
   * Handle the input event on the name input element
   *
   * @param {Event} event
   * @memberof ChangeNameComponent
   */
  onInput(event: Event) {
    this.nameChanged.emit(this.name);
  }
}
