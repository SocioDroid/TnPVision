import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';

class StudentService {
    getAllStudents() {
        return httpauth.get('/api/students/')
    }

    getSingleStudent(data){
        return httpauth.get(`/api/student/${data.id}`)
    }

    getUserDetail(){
        return httpauth.get('/api/user/')
    }

    deleteStudent(data){
        return httpauth.delete(`/api/student/${data.id}`)
    }

    getVolunteeringDrives(){
        return httpauth.get('/api/student/volunteeringDrives')
    }
    getEligibleDrives(){
        return httpauth.get('/api/student/eligibleDrives')
    }
}

export default new StudentService();