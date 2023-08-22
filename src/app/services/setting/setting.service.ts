import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';

@Injectable({ providedIn: 'root' })
export default class SettingService {
  constructor(private httpS: HttpService) { }

  fetchTemplateList(requestOpt = {}) {
    return this.httpS.get(`/setting/templates`, requestOpt);
  }

  fetchSportsTemplateList(requestOpt = {}) {
    return this.httpS.post(`/setting/templates/sports`, requestOpt);
  }

  fetchTournaments(requestOpt = {}) {
    return this.httpS.get(`/setting/tournaments`, requestOpt);
  }

  fetchTournamentsSetting(requestOpt = {}) {
    return this.httpS.post(`/setting/tournaments/setting`, requestOpt);
  }

  fetchSportsSetting(requestOpt = {}) {
    return this.httpS.post(`/setting/sports/setting`, requestOpt);
  }

  fetchTournamentsControls(requestOpt = {}) {
    return this.httpS.post(`/setting/tournaments/controls`, requestOpt);
  }

  fetchFixturesControls(requestOpt = {}) {
    return this.httpS.post(`/setting/fixtures/controls`, requestOpt);
  }

  fetchSportsControls(requestOpt = {}) {
    return this.httpS.post(`/setting/sports/controls`, requestOpt);
  }

  fetchFixturesSetting(requestOpt = {}) {
    return this.httpS.post(`/setting/fixtures/setting`, requestOpt);
  }

  updateTemplate(requestOpt) {
    return this.httpS.put(`/setting/template/edit`, requestOpt);
  }

  updateTournamentSetting(requestOpt) {
    return this.httpS.put(`/setting/tournament/setting`, requestOpt);
  }

  updateFixtureSetting(requestOpt) {
    return this.httpS.put(`/setting/fixture/setting`, requestOpt);
  }

  updateSportSetting(requestOpt) {
    return this.httpS.put(`/setting/sport/setting`, requestOpt);
  }

  updateTournamentControl(requestOpt) {
    return this.httpS.put(`/setting/tournaments/controls`, requestOpt);
  }

  updateFixturesControl(requestOpt) {
    return this.httpS.put(`/setting/fixtures/controls`, requestOpt);
  }

  updateSportControl(requestOpt) {
    return this.httpS.put(`/setting/sports/controls`, requestOpt);
  }

  createTemplate(requestOpt) {
    return this.httpS.put(`/setting/template/create`, requestOpt);
  }

  fetchFixturesSettingProfile(requestOpt = {}) {
    return this.httpS.get(`/setting/fixtures/setting`, requestOpt);
  }
}

export { SettingService };
