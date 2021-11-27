import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
    async restore(data) {
        let { access_token } = data;
        if (access_token) {
            return data;
        }
        throw 'no valid session data';
    },

    async authenticate(username, password) {
        let data = new FormData();
        data.append("grant_type", "password");
        data.append("username", username);
        data.append("password", password);
        let response = await fetch('http://localhost:8080/auth/token', {
            method: 'POST',
            body: data
        });
        if (response.ok) {
            return response.json();
        }
        let error = await response.text();
        throw new Error(error);
    },

    async invalidate(data) {
        // no-op
    }
});