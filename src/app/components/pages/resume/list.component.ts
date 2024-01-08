import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageService } from '@services/message.service';
import { of, timer } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import _ from 'lodash';
import samples from '@configs/preview-samples';
import emailjs from '@emailjs/browser'
import MainMasterService from '@services/main-master-api.service';

declare var $;

@Component({
  selector: 'app-resume-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.scss']
})
export class ResumeListComponent implements OnInit {

  on = {
    currentSample: 5,
    title: '',
    sub_title: '',
    sub_title2: '',
    completed_text: false,
    email: '',
    name: '',
    message: '',
    totalGenerated: 0
  }

  list = {
    imageUrls: samples,
    left: [],
    right: [],
    text: 'Craft stunning resumes with a few steps',
    sub_text: 'Stunning background and font color selections',
    sub_text2: 'Unlock your professional potential effortlessly and open doors to your dream career!'
  }


  constructor(
    private messageS: MessageService,
    private mainapiS: MainMasterService
  ) {
    const number = (Math.ceil(Math.random() * 10) % 10);
    this.list.imageUrls[number].active = true;
    this.on.currentSample = number;
    this.fillLeftRight()
    this.displayTitle()
  }

  ngOnInit() {
    // of(0).pipe(
    //   mergeMap(this.mainapiS.getResumeCount.bind(this.mainapiS)),
    //   tap(res => {
    //     if (this.on.totalGenerated < res) {
    //       const interval = setInterval(() => {
    //         if (this.on.totalGenerated < res) {
    //           const add = Math.min(res - this.on.totalGenerated, 15)
    //           this.on.totalGenerated = this.on.totalGenerated + add;
    //         } else {
    //           clearInterval(interval)
    //         }
    //       }, 10);
    //     }
    //   })
    // ).subscribe()
  }

  onShowPreviousImage() {
    const currentIndex = this.list.imageUrls.findIndex(v => v.active);
    this.list.imageUrls[currentIndex].active = false;
    this.list.imageUrls = this.list.imageUrls.map(v => ({ ...v, active: false }))
    const index = currentIndex - 1 >= 0 ? (currentIndex - 1) % this.list.imageUrls.length : this.list.imageUrls.length - 1;
    this.list.imageUrls[index].active = true;
  }

  onShowNextImage() {
    const currentIndex = this.list.imageUrls.findIndex(v => v.active);
    this.list.imageUrls[currentIndex].active = false;
    this.list.imageUrls = this.list.imageUrls.map(v => ({ ...v, active: false }))
    const index = currentIndex + 1 >= 0 ? (currentIndex + 1) % this.list.imageUrls.length : this.list.imageUrls.length + 1;
    this.list.imageUrls[index].active = true;
  }

  onSelectImage(image) {
    window.open(`/#/resume/${image.id}/create`, '_self')
  }

  onEmail() {
    if (!(this.on.email && this.on.message)) {
      this.updateEnv()
      return this.messageS.updateEnvelop({ type: 'error', message: 'Please provide your email and message.' })
    }

    const email = {
      from_name: this.on.name ?? 'unknown',
      from_email: this.on.email,
      message: this.on.message
    }

    emailjs.send("service_y4fekhi", "template_pwz50pa", email, 'eJe_c2_1zcjXnxKP5')
      .then(res => {
        if (res.status === 200) {
          this.messageS.updateEnvelop({ type: 'success', message: 'Email sent successfully.' });
          this.updateEnv();
          this.on.name = '';
          this.on.email = '';
          this.on.message = '';
        } else {
          this.messageS.updateEnvelop({ type: 'error', message: 'Failed to send email. Please email us directly at: 2911safi@gmail.com' });
          this.updateEnv()
        }
      })
      .catch(err => {
        this.messageS.updateEnvelop({ type: 'error', message: 'Failed to send email. Please email us directly at: 2911safi@gmail.com' });
        this.updateEnv()
      })
  }

  fillLeftRight() {
    this.list.right = this.list.imageUrls;
    for (let i = this.list.imageUrls.length - 1; i >= 0; i--) {
      this.list.left[i] = this.list.imageUrls[i];
    }
  }

  displayTitle() {
    let i = 0;
    const timer = setInterval(v => {
      i++;
      if (i >= this.list.text.length) {
        clearInterval(timer)
        this.displaySubTitle()
        return
      } else {
        this.on.title = this.list.text.slice(0, i + 1);
        i++;
      }

    }, 50)
  }

  displaySubTitle() {
    let i = 0;
    const timer = setInterval(v => {
      if (i >= this.list.sub_text.length) {
        this.on.completed_text = true;
        clearInterval(timer)
        this.on.sub_title2 = this.list.sub_text2
        return
      } else {
        this.on.sub_title = this.list.sub_text.slice(0, i + 1);
        i++;
      }

    }, 40)
  }

  updateEnv() {
    setTimeout(() => {
      this.messageS.restart()
    }, 5 * 1000);
  }


}
