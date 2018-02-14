import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training/training.component';

const ROUTES: Routes = [
    {
        path: '', component: TrainingComponent
    },
];


@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [
        RouterModule
    ]

})
export class TrainingRouterModule { }