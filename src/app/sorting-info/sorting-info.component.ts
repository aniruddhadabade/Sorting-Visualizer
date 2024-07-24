import { Component, Input } from '@angular/core';
import { AlgorithmData } from '../AlgorithmData';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-sorting-info',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './sorting-info.component.html',
  styleUrl: './sorting-info.component.css'
})
export class SortingInfoComponent {
  @Input() selectedAlgorithm: number | null = null;

  data = [
    { title: 'Select Algorithm', description: 'You must select an algorithm before you can visualize its execution on an array of numbers.', worstCase: '', avgCase: '', bestCase: '', space: '' },
    { title: 'Bubble Sort', description: 'Bubble Sort description...', worstCase: 'O(n²)', avgCase: 'O(n²)', bestCase: 'O(n)', space: 'O(1)' },
    { title: 'Insertion Sort', description: 'Insertion Sort description...', worstCase: 'O(n²)', avgCase: 'O(n²)', bestCase: 'O(n)', space: 'O(1)' },
    { title: 'Selection Sort', description: 'Selection Sort description...', worstCase: 'O(n²)', avgCase: 'O(n²)', bestCase: 'O(n²)', space: 'O(1)' },
    { title: 'Merge Sort', description: 'Merge Sort description...', worstCase: 'O(n log n)', avgCase: 'O(n log n)', bestCase: 'O(n log n)', space: 'O(n)' },
    { title: 'Quick Sort', description: 'Quick Sort description...', worstCase: 'O(n²)', avgCase: 'O(n log n)', bestCase: 'O(n log n)', space: 'O(log n)' }
  ];
}
