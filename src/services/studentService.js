import http from './HttpUrl';

class StudentService {
    getAllStudents(data) {
        http.get('/api/students/')
    }
}

export default new StudentService();