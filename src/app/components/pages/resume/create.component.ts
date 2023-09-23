import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageService } from '@services/message.service';
import { of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import _ from 'lodash';
import ZetyService from '@services/zety.service';
import samples from '@configs/samples';
import { SampleBaseComponent } from '../../shared/samples/base.component';
import objectHash from 'object-hash';
import colors from '@configs/colors';

@Component({
  selector: 'app-resume-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.scss']
})
export class ResumeCreateComponent implements OnInit {
  @ViewChild('samples', { read: ViewContainerRef }) samplesVc: ViewContainerRef;

  sample_resume_info = { "background": [{ "name": "Qandagha Safi", "profession": "Web Developer", "email": "1192safi@gmail.com", "phone": "+601123270509", "background": "As a team-oriented and skilled Computer Science graduate with\nover 4 years of progressive experience in software engineering and web development, I am eager to seek a challenging position in your esteemed organization. As an Afghan national who has studied and worked in Malaysia, I am available to start working immediately. ", "address": "B-16-02, Residence 1, Plaza @ Kelana Jaya Residence,  No.9 Jalan SS7/13B, 47301,  Petaling Jaya" }], "experience": [{ "title": "Web developer", "company": "MYCN Technology Management Sdn Bhd", "address": "Kuala Lumpur", "start": "2019-06-01", "end": "2023-08-31", "description": "I have been working on a large and complex project. My key responsibilities and achievements include:\nWriting reusable and clean programing code to develop 12/18 web and backend services.\nWorking on frontend and backend using Nodejs, Angular, Mongodb, Redis, Zookeeper", "current": false }, { "title": "Web developer", "company": "Tektician Sdn Bhd", "address": "Perak", "start": "2019-01-15", "end": "2019-06-01", "description": " My main responsibilities and achievements include:\nEnhancing customizing ERPnext components \nWriting clean frontend and backend code for features.", "current": false }], "education": [{ "university": "IIUM", "address": "Kuala Lumpur", "degree": "Bachelor's", "field": "Computer Science", "start": "2014-06-20", "end": "2019-01-01", "current": false }, { "university": "IIUM", "address": "Kuala Lumpur", "degree": "Master's", "field": "Information Technology ", "start": "2021-03-10", "end": "2023-08-01", "current": false }], "skill": "JavaScript\nNodeJS\nAngular\nHTML\nCSS\nRedis\nMongodb\nProblem-solving\nLeadership", "project": [{ "title": "Bursa Articles", "link": "http://bursa.tektician.com/" }, { "title": "Setia Awan", "link": "https://setiaawan.com/" }, { "title": "Office Admin", "link": "https://www.ugoffice.com/login" }, { "title": "Sports Informations", "link": "https://www.sportsinformations.com/login" }], "reference": [{ "name": "Jonathan Lee", "email": "jonathan@tektician.com" }, { "name": "Gan Chu Hang", "email": "hgun77@gmail.com" }], "language": [{ "name": "English" }, { "name": "Pashto" }, { "name": "Persian" }] }
  on = {
    api_key: null,
    api_secret: null,
    stage: 1,
    skills: null,
    sample_id: 1,
    preview: 0,
    bg_color: 'bg-color-01',
    lb_color: 'lb-color-01',
  }

  list = {
    skills: [
    ],
    backgrounds: [],
    experiences: [],
    educations: [],
    projects: [],
    references: [],
    languages: [],
    bgColors: colors.bgColors,
    lbColors: colors.lbColors,
    stages: [{ id: 1, completed: false }, { id: 2, completed: false }, { id: 3, completed: false }, { id: 4, completed: false }, { id: 5, completed: false }, { id: 6, completed: false }, { id: 7, completed: false }]
  }

  data = {
    credential: {},
    background: { name: null, profession: null, email: null, phone: null, background: null, address: null, },
    experience: { edit: true, title: null, company: null, address: null, start: null, end: null, description: null, current: false },
    education: { edit: true, university: null, address: null, degree: null, field: null, start: null, end: null, current: false },
    project: { title: null, link: null },
    reference: { name: null, email: null },
    language: { name: null },
    sampleComponents: {}
  }

  constructor(
    private messageS: MessageService,
    private zetyS: ZetyService,
    private resolver: ComponentFactoryResolver,
  ) {
    const resume = localStorage.getItem('resume');
    if (resume) {
      for (let [key, value] of _.entries(JSON.parse(resume))) {
        switch (key) {
          case 'background':
            this.list.stages[0].completed = !!value.find(v => objectHash(this.data.background) !== objectHash(v))
            value.map(v => this.list.backgrounds.push(v));
            break;
          case 'experience':
            this.list.stages[1].completed = !!value.find(v => objectHash(this.data.experience) !== objectHash(v))
            value.map(v => this.list.experiences.push(v));
            break;
          case 'education':
            this.list.stages[2].completed = !!value.find(v => objectHash(this.data.education) !== objectHash(v))
            value.map(v => this.list.educations.push(v));
            break;
          case 'skill':
            this.list.stages[3].completed = !!value
            this.on.skills = value;
            break;
          case 'project':
            this.list.stages[4].completed = !!value.find(v => objectHash(this.data.project) !== objectHash(v))
            value.map(v => this.list.projects.push(v));
            break;
          case 'language':
            this.list.stages[5].completed = !!value.find(v => objectHash(this.data.language) !== objectHash(v))
            value.map(v => this.list.languages.push(v));
            break;
          case 'reference':
            this.list.stages[6].completed = !!value.find(v => objectHash(this.data.reference) !== objectHash(v))
            value.map(v => this.list.references.push(v));
            break;
        }
      }
    }
  }

  ngOnInit() {
    this.list.backgrounds = this.list.backgrounds.length ? this.list.backgrounds : [{ ...this.data.background }]
    this.list.experiences = this.list.experiences.length ? this.list.experiences : [{ ...this.data.experience }]
    this.list.educations = this.list.educations.length ? this.list.educations : [{ ...this.data.education }]
    this.list.projects = this.list.projects.length ? this.list.projects : [{ ...this.data.project }]
    this.list.languages = this.list.languages.length ? this.list.languages : [{ ...this.data.language }]
    this.list.references = this.list.references.length ? this.list.references : [{ ...this.data.reference }]
    this.checkEditable();
    // setTimeout(() => {
    //   this.onGenerate()
    // }, 1000);
    console.log('this.list', this.list);
  }

  onGenerate() {
    this.on.preview = 1;
    const data = {
      background: this.list.backgrounds,
      experience: this.list.experiences,
      education: this.list.educations,
      skill: this.on.skills,
      project: this.list.projects,
      reference: this.list.references,
      language: this.list.languages,
    }


    localStorage.setItem('resume', JSON.stringify({ ...data }));
    data.skill = `${data.skill}`.split('\n').filter(v => v && v !== '');

    if (!this.data.sampleComponents[this.on.sample_id]) {
      const factory: ComponentFactory<SampleBaseComponent> =
        this.resolver.resolveComponentFactory(samples[this.on.sample_id]);
      const componentRef = this.samplesVc.createComponent(factory);
      componentRef.instance.show = 1;
      componentRef.instance.bg_sample_color = this.on.bg_color;
      componentRef.instance.lb_sample_color = this.on.lb_color;
      this.data.sampleComponents[this.on.sample_id] = componentRef.instance;
      this.data.sampleComponents[this.on.sample_id].receive(data)
    } else {
      this.data.sampleComponents[this.on.sample_id].show = 1;
      this.data.sampleComponents[this.on.sample_id].bg_sample_color = this.on.bg_color;
      this.data.sampleComponents[this.on.sample_id].lb_sample_color = this.on.lb_color;
      this.data.sampleComponents[this.on.sample_id].receive(data)
    }

  }

  onStage(stage) {
    if (stage === 'next') {
      switch (this.on.stage) {
        case 1: if (!this.checkStageFilled()) { return window.alert('Please enter personal information.') }; break;
        default: if (!this.checkStageFilled()) {
          if (!window.confirm('You did not enter complete information for this section. Are you sure to procced?')) {
            return;
          }; break;
        }
      }
    }

    console.log('this.list.stages', this.on.stage, this.list.stages);

    switch (stage) {
      case 'before': this.on.stage > 1 ? this.on.stage -= 1 : 1; break;
      case 'next':
        this.on.stage < 8 ? this.on.stage += 1 : 8;
        this.list.stages.find(v => v.id === this.on.stage - 1).completed = true;
        break;
    }

    if (this.on.stage === 2) {
      this.fetchSkills().subscribe(res => {
        this.list.skills = res.result.map(v => ({
          name: v.text,
          score: v.contentScore_DoNotUse
        }))
      })
    }
  }

  onRemove() {
    switch (this.on.stage) {
      case 2:
        this.list.experiences.pop();
        this.list.experiences[this.list.experiences.length - 1] ? this.list.experiences[this.list.experiences.length - 1].edit = 1 : 0;
        break;
      case 3:
        this.list.educations.pop();
        this.list.educations[this.list.educations.length - 1] ? this.list.educations[this.list.educations.length - 1].edit = 1 : 0; break;
      case 5: this.list.projects.pop(); break;
      case 6: this.list.languages.pop(); break;
      case 7: this.list.references.pop(); break;
    }
  }

  onAdd() {
    if (!this.checkStageFilled()) { return this.message('error', 'Please fill up required fields.') }

    switch (this.on.stage) {
      case 2:
        this.list.experiences.push({ ...this.data.experience });
        this.list.experiences[this.list.experiences.length - 2].edit = 0;
        break;
      case 3:
        this.list.educations.push({ ...this.data.education });
        this.list.educations[this.list.educations.length - 2].edit = 0;
        break;
      case 5: this.list.projects.push({ ...this.data.project }); break;
      case 6: this.list.languages.push({ ...this.data.language }); break;
      case 7: this.list.references.push({ ...this.data.reference }); break;
    }
  }

  onSkills() {
    this.list.skills = this.list.skills.map(v => ({ ...v, selected: `${this.on.skills}`.split('\n').find(f => v.name === f) }))
  }

  onSkill(skill) {
    let skills = _.cloneDeep(this.on.skills);
    skill.selected = !skill.selected;
    switch (skill.selected) {
      case false: skills = `${skills}`.split('\n').filter(v => v !== skill.name); break;
      case true:
        skills = `${skills}`.split('\n');
        skills.push(skill.name)
        skills = skills;
        break;
    }
    this.on.skills = skills?.filter(v => v !== 'null')?.join('\n');
  }

  onExpEdit(exp) {
    const dd = this.list.experiences.find(v => objectHash(_.omit(v, ['edit'])) === objectHash(_.omit(exp, ['edit'])))
    this.list.experiences = this.list.experiences.filter(v => objectHash(v) !== objectHash(this.data.experience)).map(v => ({ ...v, edit: objectHash(_.omit(v, ['edit'])) === objectHash(_.omit(exp, ['edit'])) ? true : false }));
  }

  onEduEdit(exp) {
    const dd = this.list.educations.find(v => objectHash(_.omit(v, ['edit'])) === objectHash(_.omit(exp, ['edit'])))
    this.list.educations = this.list.educations.filter(v => objectHash(v) !== objectHash(this.data.education)).map(v => ({ ...v, edit: objectHash(_.omit(v, ['edit'])) === objectHash(_.omit(exp, ['edit'])) ? true : false }));

  }

  onEdit() {
    this.data.sampleComponents[this.on.sample_id].show = 0;
    this.on.preview = 0;
    this.on.stage = 1;
  }

  onBgColor(color) {
    this.on.bg_color = color
    if (!!this.data.sampleComponents[this.on.sample_id]) {
      this.data.sampleComponents[this.on.sample_id].bg_sample_color = this.on.bg_color
    }
  }

  onLbColor(color) {
    this.on.lb_color = color
    if (!!this.data.sampleComponents[this.on.sample_id]) {
      this.data.sampleComponents[this.on.sample_id].lb_sample_color = this.on.lb_color
    }
  }

  onDownloadPdf() {
    if (!!this.data.sampleComponents[this.on.sample_id]) {
      try {
        return this.data.sampleComponents[this.on.sample_id].downloadPdf()
      } catch (err) {
        return this.message('error', 'Something went wrong :(')
      }
    } else {
      return this.message('error', 'Template missing.')
    }
  }

  message(type, message, title = null) {
    this.messageS.updateEnvelop({ type, message, title, });
    setTimeout(() => {
      this.messageS.restart();
    }, 3000);
  }

  checkStageFilled() {
    let latest = null;
    switch (this.on.stage) {

      case 1:
        latest = this.list.backgrounds[this.list.backgrounds.length - 1];
        if (!latest) { return false }
        if (!(latest.name && latest.profession && latest.phone && latest.background)) { return false }
        return true;

      case 2:
        latest = this.list.experiences[this.list.experiences.length - 1];
        if (!latest) { return false }
        if (!(latest.title && latest.company && latest.start && latest.description && (latest.end || latest.current))) { return false }
        return true;

      case 3:
        latest = this.list.educations[this.list.educations.length - 1];
        if (!latest) { return false }
        if (!(latest.university && latest.degree && latest.start && (latest.end || latest.current))) { return false }
        return true;

      case 4:
        latest = this.on.skills;
        if (!latest) { return false }
        return true;

      case 5:
        latest = this.list.projects[this.list.projects.length - 1];
        if (!latest) { return false }
        if (!(latest.title && latest.link)) { return false }
        return true;

      case 6:
        latest = this.list.languages[this.list.languages.length - 1];
        if (!latest) { return false }
        if (!(latest.name)) { return false }
        return true;

      case 7:
        latest = this.list.references[this.list.references.length - 1];
        if (!latest) { return false }
        if (!(latest.name && latest.email)) { return false }
        return true;
    }
  }

  fetchSkills() {
    const params = {
      user_uid: 'e07dce6b-22bd-47ef-b74a-ff3aefd1a889',
      sectionTypeCD: 'HILT',
      productCD: 'RWZ',
      Jobtitle: this.list.backgrounds[0]?.profession,
      searchItemType: 'jobTitle',
    }
    return this.zetyS.getSkills(params)
  }

  checkEditable() {
    if (!this.list.experiences.find(v => v.edit)) {
      this.list.experiences[this.list.experiences.length - 1] = { ...this.list.experiences[this.list.experiences.length - 1], edit: true }
    }
    if (!this.list.educations.find(v => v.edit)) {
      this.list.educations[this.list.educations.length - 1] = { ...this.list.educations[this.list.educations.length - 1], edit: true }
    }

    if (this.list.experiences.filter(v => v.edit).length > 1) {
      this.list.experiences = this.list.experiences.map(v => ({ ...v, edit: false }))
      this.list.experiences[this.list.experiences.length - 1] = { ...this.list.experiences[this.list.experiences.length - 1], edit: true }
    }

    if (this.list.educations.filter(v => v.edit).length > 1) {
      this.list.educations = this.list.educations.map(v => ({ ...v, edit: false }))
      this.list.educations[this.list.educations.length - 1] = { ...this.list.educations[this.list.educations.length - 1], edit: true }
    }
  }

  formatMergeItems(list) {
    return list.filter(v => v).join(' ,')
  }
  getListable(array) {
    return !!array.filter(v => !v.edit).length;
  }
}
