import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  // Application specific overrides go here
  host = 'http://localhost:8080/api';

  @computed('session.data.authenticated.access_token')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['Authorization'] = 'Bearer ' + this.session.data.authenticated.access_token;
    }
    return headers;
  }
}
