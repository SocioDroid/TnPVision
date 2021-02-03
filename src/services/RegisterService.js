import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';
class RegisterService {
    registerStudent(data) {
        return httpauth.post('/api/register/student/', data);
    }

    registerEmployee(data) {
        return httpauth.post('/api/register/employee/', data);
    }
}

export default new RegisterService();