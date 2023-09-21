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
    console.log('this.data', this.data);

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

    // outputPdf((pdf) => {
    //   // You can save or display the PDF here
    //   pdf.;
    //   // To open the PDF in a new tab, use:
    //   // window.open(pdf.output('bloburl'), '_blank');
    // });

    return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    // Get the HTML element you want to convert to PDF
    const elementToConvert = document.getElementById('sample'); // Replace 'elementId' with the ID of your HTML element

    // Use html2canvas to capture the HTML element as an image
    html2canvas(elementToConvert, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Add the captured image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)

      // Save the PDF file (optional: you can also use 'dataurlnewwindow' to open it in a new window)
      pdf.save('resume.pdf');
    });
  }


}

export { SampleBaseComponent };
