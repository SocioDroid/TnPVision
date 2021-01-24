import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';

class StudentService {
    getAllStudents() {
        return httpauth.get('/api/students/')
    }

    getSingleStudent(data){
        return httpauth.get(`/api/student/${data.id}`)
    }

    getStudentDetail(){
        return httpauth.get('/api/user/')
    }

    deleteStudent(data){
        return httpauth.delete(`/api/student/${data.id}`)
    }
}

export default new StudentService();