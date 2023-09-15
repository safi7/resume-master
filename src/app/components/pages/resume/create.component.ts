import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageService } from '@services/message.service';
import { of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import _ from 'lodash';
import ZetyService from '@services/zety.service';
import samples from '@configs/samples';
import { SampleBaseComponent } from '../../shared/samples/base.component';

@Component({
  selector: 'app-resume-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.scss']
})
export class ResumeCreateComponent implements OnInit {
  @ViewChild('samples', { read: ViewContainerRef }) samplesVc: ViewContainerRef;
  on = {
    api_key: null,
    api_secret: null,
    stage: 5,
    skills: null,
    sample_id: 1,
  }

  list = {
    skills: [
      { id: 1, name: 'XXXXXXXXX' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
      { id: 2, name: 'YYYYYYYYY' },
    ],
    backgrounds: [],
    experiences: [],
    educations: [],
    projects: [],
    references: [],
    languages: []
  }

  data = {
    credential: {},
    background: { name: null, profession: null, email: null, phone: null, background: null, address: null, },
    experience: { title: null, company: null, address: null, start: null, end: null, description: null, current: false },
    education: { university: null, address: null, degree: null, field: null, start: null, end: null, current: false },
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
          case 'background': value.map(v => this.list.backgrounds.push(v)); break;
          case 'experience': value.map(v => this.list.experiences.push(v)); break;
          case 'education': value.map(v => this.list.educations.push(v)); break;
          case 'project': value.map(v => this.list.projects.push(v)); break;
          case 'language': value.map(v => this.list.languages.push(v)); break;
          case 'skill': this.on.skills = value; break;
          case 'reference': value.map(v => this.list.references.push(v)); break;
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
    this.list.languages = this.list.languages.length ? this.list.languages : [{ ...this.data.language }]
    console.log('this.list', this.list);
  }

  onGenerate() {
    const data = {
      background: this.list.backgrounds,
      experience: this.list.experiences,
      education: this.list.educations,
      skill: this.on.skills,
      project: this.list.projects,
      reference: this.list.references,
      language: this.list.languages,
    }

    localStorage.setItem('resume', JSON.stringify(data));

    if (!this.data.sampleComponents[this.on.sample_id]) {
      const factory: ComponentFactory<SampleBaseComponent> =
        this.resolver.resolveComponentFactory(samples[this.on.sample_id]);
      const componentRef = this.samplesVc.createComponent(factory);
      componentRef.instance.show = 1;
      this.data.sampleComponents[this.on.sample_id] = componentRef.instance;
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

    switch (stage) {
      case 'before': this.on.stage > 1 ? this.on.stage -= 1 : 1; break;
      case 'next': this.on.stage < 8 ? this.on.stage += 1 : 8; break;
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
    console.log('onAdd', this.on);
    switch (this.on.stage) {
      case 2: this.list.experiences.pop(); break;
      case 3: this.list.educations.pop(); break;
      case 5: this.list.projects.pop(); break;
      case 6: this.list.languages.pop(); break;
      case 7: this.list.references.pop(); break;
    }
  }

  onAdd() {
    console.log('onAdd', this.on);
    if (!this.checkStageFilled()) { return this.message('error', 'Please fill up required fields.') }

    switch (this.on.stage) {
      case 2: this.list.experiences.push({ ...this.data.experience }); break;
      case 3: this.list.educations.push({ ...this.data.education }); break;
      case 5: this.list.projects.push({ ...this.data.project }); break;
      case 6: this.list.languages.push({ ...this.data.language }); break;
      case 7: this.list.references.push({ ...this.data.reference }); break;
    }

    console.log('this.list.projects', _.cloneDeep(this.list.projects));

  }

  onSkills() {
    this.list.skills = this.list.skills.map(v => ({ ...v, selected: `${this.on.skills}`.split('\n').find(f => v.name === f) }))
  }

  onSkill(skill) {
    console.log('onSkill', skill);
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
    console.log('skill.selected', skill.selected)
    this.on.skills = skills?.filter(v => v !== 'null')?.join('\n');
  }

  message(type, message, title = null) {
    this.messageS.updateEnvelop({ type, message, title, });
    setTimeout(() => {
      this.messageS.restart();
    }, 3000);
  }

  checkStageFilled() {
    let latest = null;
    console.log('this.on.stage', this.on.stage);
    switch (this.on.stage) {

      case 1:
        latest = this.list.backgrounds[this.list.backgrounds.length - 1];
        console.log('latest', latest);
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

  const
}
