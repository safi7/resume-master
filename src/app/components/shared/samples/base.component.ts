import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-resume-sample-base',
  template: '<div>Base Samples</div>',
})
export default class SampleBaseComponent implements OnInit {

  show = 0;
  bg_sample_color = 'bg-color-01';
  lb_sample_color = 'lb-color-01';
  data = {
    background: [],
    experience: [],
    education: [],
    project: [],
    reference: [],
    language: [],
    skill: []
  };

  constructor() {
  }

  ngOnInit() {
  }


  receive(data) {
    console.log('receive', data);
    this.data = { ...this.data, ...data };
  }

  downloadPdf() {
    const element = document.getElementById('sample'); // Get the HTML element to convert
    const opt = {
      margin: 0,
      filename: 'myPDF.pdf', // Specify the filename for the PDF
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save()
    return;
  }

  joinFields(fields, joiner) {
    return fields.filter(v => !!v).join(joiner)
  }


}

export { SampleBaseComponent };
