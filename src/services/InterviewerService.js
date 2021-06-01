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
    getStudentsFromRound(){
        return  httpauth.get(`/api/interviewer/?round=true`)
    }
    getStudentReviews(id){
        // console.log("InterService data : ", data);
        return httpauth.get(`/api/review/${id}/`)
    }
    submitReview(data){
        return httpauth.post('/api/review/', data)
    }
}

export default new InterviewerService();