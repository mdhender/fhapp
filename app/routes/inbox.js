import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InboxRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    console.log('app/routes/inbox: model hook just ran!');
    return this.store.findAll('message');
  }
}
