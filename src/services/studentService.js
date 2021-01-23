import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl'

class StudentService {
    getAllStudents(data) {
        http.get('/api/students/')
    }

    getStudentDetail(data){
        return httpauth.get('/api/user/')
    }
}

export default new StudentService();