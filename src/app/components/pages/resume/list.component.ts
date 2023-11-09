import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageService } from '@services/message.service';
import { of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import _ from 'lodash';
import samples from '@configs/preview-samples';


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
    completed_text: false
  }

  list = {
    imageUrls: samples,
    left: [],
    right: [],
    text: 'Craft stunning resumes with a few effortless steps',
    sub_text: 'Stunning background and font color selections'
  }


  constructor(
    private messageS: MessageService,
  ) {
    const number = (Math.ceil(Math.random() * 10) % 10);
    this.list.imageUrls[number].active = true;
    this.on.currentSample = number;
    this.fillLeftRight()
    this.displayTitle()
  }

  ngOnInit(): void {
  }

  showPreviousImage() {
    const currentIndex = this.list.imageUrls.findIndex(v => v.active);
    this.list.imageUrls[currentIndex].active = false;
    this.list.imageUrls = this.list.imageUrls.map(v => ({ ...v, active: false }))
    const index = currentIndex - 1 >= 0 ? (currentIndex - 1) % this.list.imageUrls.length : this.list.imageUrls.length - 1;
    this.list.imageUrls[index].active = true;
  }

  showNextImage() {
    const currentIndex = this.list.imageUrls.findIndex(v => v.active);
    this.list.imageUrls[currentIndex].active = false;
    this.list.imageUrls = this.list.imageUrls.map(v => ({ ...v, active: false }))
    const index = currentIndex + 1 >= 0 ? (currentIndex + 1) % this.list.imageUrls.length : this.list.imageUrls.length + 1;
    this.list.imageUrls[index].active = true;
  }

  selectImage(image) {
    window.open(`/#/resume/${image.id}/create`, '_self')
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
        return
      } else {
        this.on.sub_title = this.list.sub_text.slice(0, i + 1);
        i++;
      }

    }, 40)
  }


}
