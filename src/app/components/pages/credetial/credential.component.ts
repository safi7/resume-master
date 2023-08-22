import { Component, OnInit } from '@angular/core';
import CredentialService from '@services/credential/credential.service';
import { MessageService } from '@services/message.service';
import { of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.scss']
})
export class CredentialComponent implements OnInit {

  on = {
    api_key: null,
    api_secret: null,
  }

  data = {
    credential: {}
  }

  constructor(
    private messageS: MessageService,
    private credentialS: CredentialService
  ) { }

  ngOnInit() {
    // of(0).pipe(
    //   mergeMap(this.fetchCredential.bind(this)),
    //   tap(this.fetchCredentialHandler.bind(this))
    // ).subscribe()
  }

  onMakeKey(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  onResetApiSccret() {
    this.on.api_secret = this.onMakeKey(32);
  }

  onSave() {
    console.log(this.on);
    if (!this.on.api_secret) { return null; }
    this.credentialS.updateCredential({ api_secret: this.on.api_secret })
      .subscribe(res => {
        this.message('success', 'Successfully updated.')
      }, err => {
        this.message('error', 'Failed to update.')
      })
  }

  fetchCredential() {
    return this.credentialS.getCredential({});
  }

  fetchCredentialHandler(response) {
    console.log('fetchCredentialHandler', response);
    this.on = { ...this.on, ...response.data }
  }

  message(type, message, title = null) {
    this.messageS.updateEnvelop({ type, message, title, channel: 'private' });
  }
}
