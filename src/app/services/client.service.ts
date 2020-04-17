import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Client } from '../models/Client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    //Get Clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.clients;
  }

  newClient(client: Client): void {
    this.clientsCollection.add(client);
  }
}
