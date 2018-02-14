import { NgModule } from '@angular/core';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { TrainingRouterModule } from './training-routing.module';
import { StopTrainingComponent } from './current-training/stop-training.component';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports: [
        TrainingRouterModule,
        SharedModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}