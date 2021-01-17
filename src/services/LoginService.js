import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl'

class LoginService {
    // constructor() {
    //     this.state = {
    //         header: { "token": Auth.getToken() }
    //     }
    // }

    login(data) {
        return http.post('/api/login/', data);
    }
    logout() {
        return httpauth.post('/api/logout/');
    }
}

export default new LoginService();