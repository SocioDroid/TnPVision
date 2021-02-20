import httpauth from './AuthorizedHttpUrl';

class InterviewerService {
    getCompany() {
        return httpauth.get('/api/interviewer/?company=true/')
    }
    getDrive(){
        return httpauth.get('/api/interviewer/?drive=true/')
    }
    getInterviewerDetails(){
        return httpauth.get('/api/user/')
    }
    getStudentsFromRound(id){
        return  httpauth.get(`/api/interviewer/?round=${id}`)
    }
}

export default new InterviewerService();