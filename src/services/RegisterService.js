import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';
class RegisterService {
    registerStudent(data) {
        return http.post('/api/register/student/', data);
    }

    registerEmployee(data) {
        return http.post('/api/register/employee/', data);
    }
}

export default new RegisterService();