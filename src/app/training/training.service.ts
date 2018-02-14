import { Exercise } from "./exercise.model";
import { Subject } from "rxjs/Subject";
import { REACTIVE_DRIVEN_DIRECTIVES } from "@angular/forms/src/directives";
import { AngularFirestore } from "angularfire2/firestore";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { UIService } from "../shared/ui.service";

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    availableExercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private firebaseSubscriptions: Subscription[] = [];

    private availableExercises: Exercise[] = [];

    private runningExercise: Exercise;

    constructor(private db: AngularFirestore,
    private uiService: UIService) { }

    fetchAvailableExercises() {
        this.firebaseSubscriptions.push(
            this.db
                .collection('availableExercises')
                .snapshotChanges()
                .map(docArray => {
                    return docArray.map(doc => {
                        const docData = doc.payload.doc.data();
                        return {
                            id: doc.payload.doc.id,
                            name: docData.name,
                            duration: docData.duration,
                            calories: docData.calories
                        };
                    });
                })
                .subscribe((exercises: Exercise[]) => {
                    this.availableExercises = exercises;
                    this.availableExercisesChanged.next([...this.availableExercises]);
                }, error => {
                    this.uiService.showSnackbar(error.message, null, 3000);
                    this.availableExercisesChanged.next(null);
                    
                }));
        return this.availableExercises.slice();
    }

    startExercise(id: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === id);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'canceled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchFinishedExercises() {
        this.firebaseSubscriptions.push(
            this.db.collection('finishedExercises')
                .valueChanges()
                .subscribe((exercises: Exercise[]) => {
                    this.finishedExercisesChanged.next(exercises);
                }, error => {
                    this.uiService.showSnackbar(error.message, null, 3000);
                }));
    }

    cancelSubscriptions() {
        this.firebaseSubscriptions
            .forEach(subscription => subscription.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises')
            .add(exercise);
    }
}