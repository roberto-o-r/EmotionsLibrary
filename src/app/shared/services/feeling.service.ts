import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FeelingService {

  constructor(private afs: AngularFirestore) { }

  addFeeling(feeling) {
    this.afs.collection('feelings').add(feeling);      
    
  }

  getFeelings() {
    return this.afs.collection('feelings', ref => ref.orderBy('name')).valueChanges();
  }
}