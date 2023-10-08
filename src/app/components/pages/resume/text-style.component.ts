import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageService } from '@services/message.service';
import _ from 'lodash';
import ZetyService from '@services/zety.service';
import { IPopupableComponent } from '@interfaces/popupable.component';
import Quill from 'quill';
import { IndentStyle } from '../style/indent.js';
import sanitize from 'sanitize-html';


Quill.register(Quill.import('attributors/attribute/direction'), true);

Quill.register(Quill.import('attributors/class/align'), true);
Quill.register(Quill.import('attributors/class/background'), true);
Quill.register(Quill.import('attributors/class/color'), true);
Quill.register(Quill.import('attributors/class/direction'), true);
Quill.register(Quill.import('attributors/class/font'), true);
Quill.register(Quill.import('attributors/class/size'), true);

Quill.register(Quill.import('attributors/style/align'), true);
Quill.register(Quill.import('attributors/style/background'), true);
Quill.register(Quill.import('attributors/style/color'), true);
Quill.register(Quill.import('attributors/style/direction'), true);
Quill.register(Quill.import('attributors/style/font'), true);
Quill.register(Quill.import('attributors/style/size'), true);

Quill.register(IndentStyle, true);


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
    console.log('loadParameters', parameters);
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
        this.on.content = info ? info : '';
        break;

    }
  }
  onSuccess = (input = '') => { };
  onChildClose = () => { };
  onParentClose = () => { };

  formatHtmlAttributes(content) {
    content = sanitize(content, {
      allowedTags: false,
      allowedAttributes: {
        a: ['src', 'href', 'name', 'target'],
        img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
        div: ['style'],
      },
      allowedSchemes: ['data', 'http', 'https'],
      allowedIframeHostnames: [],
    });

    content = content.replace(/<p>(<br>)(\r\n|\n|\r)?<\/p>/igm, "");
    content = content.replace(/<span>(<img[^\]]+>)<\/span>/ig, "$1");
    content = content.replace(/<p>(<img[^>]+?>)(\r\n|\n|\r)?<\/p>/igm, "<div style:'width:100%; overflow-x:auto;'>$1</div>");
    return { content };
  }
}
function sanitize(content: any, arg1: { allowedTags: boolean; allowedAttributes: { a: string[]; img: string[]; div: string[]; }; allowedSchemes: string[]; allowedIframeHostnames: undefined[]; }): any {
  throw new Error('Function not implemented.');
}

