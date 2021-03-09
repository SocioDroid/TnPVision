import httpauth from './AuthorizedHttpUrl';

class StudentService {

    volunteerSearch(inputValue) {
        return httpauth.get("api/volunteer/search/?q=" + inputValue)
    }

    getAllStudents() {
        return httpauth.get('/api/students/')
    }

    getSingleStudent(data) {
        return httpauth.get(`/api/student/${data.id}`)
    }

    getSingleStudentwithid(id) {
        return httpauth.get(`/api/student/${id}`)
    }

    getUserDetail() {
        return httpauth.get('/api/user/')
    }

    deleteStudent(data) {
        return httpauth.delete(`/api/student/${data.id}`)
    }

    getVolunteeringDrives() {
        return httpauth.get('/api/student/volunteeringDrives')
    }

    getEligibleDrives() {
        return httpauth.get('/api/student/eligibleDrives')
    }

    updateSingleStudent(id, data) {
        return httpauth.patch('/api/student/' + id, data)
    }

    updateStudent(acadData) {
        return httpauth.put('/api/user/', acadData)
    }

    getAchievement() {
        return httpauth.get('api/student/achievement/')
    }

    updateAchievement(data) {
        return httpauth.put('api/student/achievement/', data)
    }

    updateIndividualAchievement(data) {
        return httpauth.patch('api/student/achievement/', data)
    }

    getCertificate() {
        return httpauth.get('api/student/certificate/')
    }

    updateCertificate(data) {
        return httpauth.put('api/student/certificate/', data)
    }

    updateIndividualCertificate(data) {
        return httpauth.patch('api/student/certificate/', data)
    }


    getCurricular() {
        return httpauth.get('api/student/curricular/')
    }

    updateCurricular(data) {
        return httpauth.put('api/student/curricular/', data)
    }

    updateIndividualCurricular(data) {
        return httpauth.patch('api/student/curricular/', data)
    }

    getProject() {
        return httpauth.get('api/student/project/')
    }

    updateProject(data) {
        return httpauth.put('api/student/project/', data)
    }

    updateIndividualProject(data) {
        return httpauth.patch('api/student/project/', data)
    }


    getExperience() {
        return httpauth.get('api/student/experience/')
    }

    updateExperience(data) {
        return httpauth.put('api/student/experience/', data)
    }

    updateIndividualExperience(data) {
        return httpauth.patch('api/student/experience/', data)
    }

    uploadStudents(data) {
        return httpauth.post('/api/upload/', data)
    }

    getStudentReviews(){
        return httpauth.get(`/api/review/`)
    }
}










export default new StudentService();