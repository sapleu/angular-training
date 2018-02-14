import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, OnDestroy, AfterViewInit {
  private finishedExercisesSubscription: Subscription;
  displayedColumns: string[] = [
    "date",
    "name",
    "duration",
    "calories",
    "state",
  ];

  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe(exercises => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchFinishedExercises();
  }

  ngOnDestroy(): void {
    if (this.finishedExercisesSubscription) this.finishedExercisesSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  filterExercises(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
