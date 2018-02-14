import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.availableExercisesSubscription) this.availableExercisesSubscription.unsubscribe();
  }

  exercises: Exercise[];
  availableExercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.availableExercisesSubscription = this.trainingService.availableExercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.fetchExercices();
  }

  fetchExercices() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(startExerciseForm: NgForm) {
    this.trainingService.startExercise(startExerciseForm.value.selectedExercise);
  }
}
