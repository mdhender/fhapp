import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
    @service session;

    @tracked error;
    @tracked username;
    @tracked password;

    @action
    async login(event) {
        event.preventDefault();
        try {
            await this.session.authenticate('authenticator:token', this.username, this.password);
        } catch(error) {
            this.error = error;
        }
    }

    @action
    update(attr, event) {
        this[attr] = event.target.value;
    }

    // implement "remember me" for cookie storage
    _rememberMe = false;
    get rememberMe() {
        return this._rememberMe;
    }
    set rememberMe(value) {
        let expirationTime = value ? (14 * 24 * 60 * 60) : null;
        this.set('session.store.cookieExpirationTime', expirationTime);
        this._rememberMe = value;
    }
}
