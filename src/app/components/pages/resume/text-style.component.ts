import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageService } from '@services/message.service';
import _ from 'lodash';
import ZetyService from '@services/zety.service';
import { IPopupableComponent } from '@interfaces/popupable.component';
import Quill from 'quill';
@Component({
  selector: 'app-resume-text-style',
  templateUrl: './text-style.component.html',
  styleUrls: ['./text-style.scss']
})
export class ResumeTextStyleComponent implements OnInit, IPopupableComponent {
  @ViewChild('editor') editorElement: ElementRef;

  private quill: any;
  on = {
    section: null,
    info: null,
    content: null,
  }

  list = {
    info: [],
  }

  data = {
    info: {},
  }

  modules = {
    toolbar: [
      ['bold'],
      ['italic'],
      ['underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ]
  }

  constructor(
    private messageS: MessageService,
    private zetyS: ZetyService,
  ) {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.quill = new Quill(this.editorElement.nativeElement, {
      placeholder: 'text goes here ...',
      theme: 'snow',
      modules: this.modules,
    });
    this.quill.root.innerHTML = this.on.content;
  }

  onSave() {
    let html = this.quill.root.innerHTML;
    html = html.replace('\n', "");
    html = html.replace('<p></p>', "");
    html = html.replace('<p><br></p>', "");
    this.onSuccess(html);
    this.onParentClose()
  }

  loadParameters(parameters) {
    // console.log('loadParameters', parameters);
    this.on.section = parameters.section;
    this.list.info = parameters.info;
    let info = null;
    switch (this.on.section) {
      case 'background':
        info = parameters.info.backgrounds[parameters.index]
        this.on.content = info && info.background ? info.background : '';
        break;
      case 'experience':
        info = parameters.info.experiences[parameters.index]
        this.on.content = info && info.description ? info.description : '';
        break;
      case 'skill':
        info = parameters.info.skills[parameters.index]
        this.on.content = info ? info.replace('<p>Write your skills here...</p>', '') : '';
        break;

    }
  }
  onSuccess = (input = '') => { };
  onChildClose = () => { };
  onParentClose = () => { };
}

