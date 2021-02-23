import http from './HttpUrl';

class RegisterService {
    registerStudent(data) {
        return http.post('/api/register/student/', data);
    }

    registerEmployee(data) {
        return http.post('/api/register/employee/', data);
    }
}

export default new RegisterService();