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

    addStudentToNextRound(driveId, roundId, data){
        return http.patch('/api/drive/' + driveId + '/round/' + roundId + '/', data)
    }
}

export default new RoundsService();