import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  stepDuration: number;


  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.stepDuration = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      } else {
        this.progress++;
      }
    }, this.stepDuration);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startTimer();

      }
    });
  }

}