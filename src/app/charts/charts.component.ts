import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit {
  array: number[] = [];
  arraySize: number = 15;
  speed: number = 50;

  ngOnInit(): void {
    this.generateNewArray();
  }

  generateNewArray(): void {
    this.array = [];
    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(Math.floor(Math.random() * 100) + 1);
    }
  }

  async sort(type: string): Promise<void> {
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
  }

  async bubbleSort(): Promise<void> {
    const length = this.array.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.array[j] > this.array[j + 1]) {
          this.swap(j, j + 1);
          await this.sleep(this.speed);
        }
      }
    }
  }

  async insertionSort(): Promise<void> {
    const length = this.array.length;
    for (let i = 1; i < length; i++) {
      let key = this.array[i];
      let j = i - 1;
      while (j >= 0 && this.array[j] > key) {
        this.array[j + 1] = this.array[j];
        j = j - 1;
        await this.sleep(this.speed);
      }
      this.array[j + 1] = key;
    }
  }

  async selectionSort(): Promise<void> {
    const length = this.array.length;
    for (let i = 0; i < length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < length; j++) {
        if (this.array[j] < this.array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        this.swap(i, minIdx);
        await this.sleep(this.speed);
      }
    }
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
      if (leftArray[i] <= rightArray[j]) {
        this.array[k] = leftArray[i];
        i++;
      } else {
        this.array[k] = rightArray[j];
        j++;
      }
      k++;
      await this.sleep(this.speed);
    }

    while (i < leftArray.length) {
      this.array[k] = leftArray[i];
      i++;
      k++;
      await this.sleep(this.speed);
    }

    while (j < rightArray.length) {
      this.array[k] = rightArray[j];
      j++;
      k++;
      await this.sleep(this.speed);
    }
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
      if (this.array[j] < pivot) {
        i++;
        this.swap(i, j);
        await this.sleep(this.speed);
      }
    }
    this.swap(i + 1, right);
    await this.sleep(this.speed);
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
