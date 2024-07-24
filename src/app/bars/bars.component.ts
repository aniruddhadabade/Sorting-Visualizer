import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bars',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule],
  templateUrl: './bars.component.html',
  styleUrl: './bars.component.css'
})
export class BarsComponent implements OnInit{
  array: number[] = [];
  arraySize: number = 15;
  speed: number = 15;
  sortedIndices: number[] = [];
  comparingIndices: number[] = [];
  swappingIndices: number[] = [];

  // Toast configuration
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  ngOnInit(): void {
    this.generateNewArray();
  }

  generateNewArray(): void {
    this.array = [];
    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(Math.floor(Math.random() * 100) + 1);
    }
    this.sortedIndices = [];
    this.comparingIndices = [];
    this.swappingIndices = [];
  }

  onSpeedChange(newSpeed: number) {
    this.speed = newSpeed;
  }

  onArraySizeChange(newSize: number) {
    this.arraySize = newSize;
    this.generateNewArray();
  }

  async sort(type: string): Promise<void> {
    this.sortedIndices = [];
    
    // Notify that sorting has started
    this.Toast.fire({
      icon: 'info',
      title: `Sorting ${type}...`
    });

    try {
      switch (type) {
        case 'bubble':
          await this.bubbleSort();
          break;
        case 'insertion':
          await this.insertionSort();
          break;
        case 'selection':
          await this.selectionSort();
          break;
        case 'merge':
          await this.mergeSort(0, this.array.length - 1);
          break;
        case 'quick':
          await this.quickSort(0, this.array.length - 1);
          break;
      }
      
      // Notify that sorting is complete
      this.Toast.fire({
        icon: 'success',
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} sort completed!`
      });
    } catch (error) {
      // Notify of an error
      this.Toast.fire({
        icon: 'error',
        title: 'An error occurred during sorting'
      });
    }
    
    this.sortedIndices = Array.from({ length: this.array.length }, (_, i) => i);
  }

  async bubbleSort(): Promise<void> {
    const length = this.array.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        this.comparingIndices = [j, j + 1];
        if (this.array[j] > this.array[j + 1]) {
          this.swappingIndices = [j, j + 1];
          this.swap(j, j + 1);
          await this.sleep(this.speed * 100);
        }
        this.swappingIndices = [];
      }
      this.sortedIndices.push(length - i - 1);
    }
    this.comparingIndices = [];
  }

  async insertionSort(): Promise<void> {
    const length = this.array.length;
    for (let i = 1; i < length; i++) {
      let key = this.array[i];
      let j = i - 1;
      while (j >= 0 && this.array[j] > key) {
        this.comparingIndices = [j, j + 1];
        this.array[j + 1] = this.array[j];
        j = j - 1;
        await this.sleep(this.speed * 100);
      }
      this.array[j + 1] = key;
    }
    this.sortedIndices = Array.from({ length: this.array.length }, (_, i) => i);
    this.comparingIndices = [];
  }

  async selectionSort(): Promise<void> {
    const length = this.array.length;
    for (let i = 0; i < length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < length; j++) {
        this.comparingIndices = [minIdx, j];
        if (this.array[j] < this.array[minIdx]) {
          minIdx = j;
        }
        await this.sleep(this.speed * 100);
      }
      if (minIdx !== i) {
        this.swappingIndices = [i, minIdx];
        this.swap(i, minIdx);
        await this.sleep(this.speed * 100);
        this.swappingIndices = [];
      }
      this.sortedIndices.push(i);
    }
    this.sortedIndices.push(length - 1);
    this.comparingIndices = [];
  }

  async mergeSort(left: number, right: number): Promise<void> {
    if (left >= right) {
      return;
    }
    const middle = Math.floor((left + right) / 2);
    await this.mergeSort(left, middle);
    await this.mergeSort(middle + 1, right);
    await this.merge(left, middle, right);
  }

  async merge(left: number, middle: number, right: number): Promise<void> {
    const leftArray = this.array.slice(left, middle + 1);
    const rightArray = this.array.slice(middle + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
      this.comparingIndices = [left + i, middle + 1 + j];
      if (leftArray[i] <= rightArray[j]) {
        this.array[k] = leftArray[i];
        i++;
      } else {
        this.array[k] = rightArray[j];
        j++;
      }
      k++;
      await this.sleep(this.speed * 100);
    }

    while (i < leftArray.length) {
      this.array[k] = leftArray[i];
      i++;
      k++;
      await this.sleep(this.speed * 100);
    }

    while (j < rightArray.length) {
      this.array[k] = rightArray[j];
      j++;
      k++;
      await this.sleep(this.speed * 100);
    }
    this.comparingIndices = [];
  }

  async quickSort(left: number, right: number): Promise<void> {
    if (left >= right) {
      return;
    }
    const pivotIdx = await this.partition(left, right);
    await this.quickSort(left, pivotIdx - 1);
    await this.quickSort(pivotIdx + 1, right);
  }

  async partition(left: number, right: number): Promise<number> {
    const pivot = this.array[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      this.comparingIndices = [j, right];
      if (this.array[j] < pivot) {
        i++;
        this.swappingIndices = [i, j];
        this.swap(i, j);
        await this.sleep(this.speed * 100);
        this.swappingIndices = [];
      }
    }
    this.swappingIndices = [i + 1, right];
    this.swap(i + 1, right);
    await this.sleep(this.speed * 100);
    this.swappingIndices = [];
    this.comparingIndices = [];
    return i + 1;
  }

  swap(i: number, j: number): void {
    const temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
