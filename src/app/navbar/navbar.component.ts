import { CommonModule } from '@angular/common';
import { Component,  Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortingInfoComponent } from "../sorting-info/sorting-info.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, SortingInfoComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  speed: number = 1; // Default value for speed
  arraySize: number = 5; // Default value for array size

  @Output() speedChange = new EventEmitter<number>();
  @Output() arraySizeChange = new EventEmitter<number>();
  @Output() generateArray = new EventEmitter<void>();

  onSpeedChange() {
    this.speedChange.emit(this.speed);
  }

  onArraySizeChange() {
    this.arraySizeChange.emit(this.arraySize);
  }

  generateNewArray() {
    this.generateArray.emit();
  }
}
