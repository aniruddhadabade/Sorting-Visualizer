import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BarsComponent } from './bars/bars.component';
import { ChartsComponent } from './charts/charts.component';
export const routes: Routes = [
    {path: 'nav', component: NavbarComponent},
    {path: '', component: BarsComponent},
    {path: 'ch', component: ChartsComponent},
];
