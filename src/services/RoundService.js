import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';
import HttpUrl from './HttpUrl';

class RoundsService {
    getAllRounds(driveId) {
        return http.get('/api/drive/' + driveId + '/round/')
    }
    getAllStudentOfRound(driveId, roundId){
        return http.get('/api/drive/' + driveId + '/round/' + roundId)
    }    
    // addSingleDrive(data){
    //     return HttpUrl.post('/api/drive/', data)
    // }
    // getSingleDrive(data){
    //     return httpauth.get(`/api/drive/${data.id}/`)
    // }

    // deleteDrive(data){
    //     return http.delete(`/api/drive/${data.id}/`)
    // }
}

export default new RoundsService();