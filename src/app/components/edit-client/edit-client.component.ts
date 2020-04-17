import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    //GET ID FROM URL
    this.id = this.route.snapshot.params['id'];

    //Get Client
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please Fill Out The Form Correctly', {
        cssClass: 'alert-danger',
        timeout: 5000,
      });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show('Client Updated', {
        cssClass: 'alert-success',
        timeout: 5000,
      });
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
