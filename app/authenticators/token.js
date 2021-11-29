import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
    async restore(data) {
        console.log('authenticators', 'restore', data);
        let { token } = data;
        if (token) {
            return data;
        }
        throw 'no valid session data';
    },

    async authenticate(username, password) {
        let headers = {};
        headers['Content-type'] = 'application/json';
        let response = await fetch('http://localhost:8080/auth/jwt', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({username, password})
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