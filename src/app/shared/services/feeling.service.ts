import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Feeling } from '../../models/feeling.model';

@Injectable()
export class FeelingService {

  constructor(private afs: AngularFirestore) { }

  addFeeling(feeling) {
    this.afs.collection('feelings').add(feeling);      
  }

  updateFeeling(feeling) {
    this.afs.collection('feelings').doc(feeling.id).update({name: feeling.name, description: feeling.description});      
  }

  deleteFeeling(feeling) {
    this.afs.collection('feelings').doc(feeling.id).delete();      
  }

  getFeelings() {
    return this.afs.collection('feelings', ref => ref.orderBy('name')).snapshotChanges().map(feelings => {
      return feelings.map(feeling => {
        const data = feeling.payload.doc.data() as Feeling;
        const id = feeling.payload.doc.id;
        return { id, ...data };
      });
    });
  }
}