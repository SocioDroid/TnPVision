import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl'

class LoginService {
    
    login(data) {
        return http.post('/api/login/', data);
    }

    logout() {
        console.log('Logout  method')
        return httpauth.post('/api/logout/');
    }

    changePassword(data){
        return httpauth.put('/api/change-password/', data)
    }

    forgotPassword(data){
        return http.post("/api/password_reset/", data)
    }

    validateForgotPasswordToken(data){
        return http.post('/api/password_reset/validate_token/', data)
    }

    updateForgotPassword(data){
        return http.post('/api/password_reset/confirm/', data)
    }
}

export default new LoginService();