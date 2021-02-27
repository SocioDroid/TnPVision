import http from './HttpUrl';

class RoundsService {
    getAllRounds(driveId) {
        return http.get('/api/drive/' + driveId + '/round/')
    }
    
    getAllStudentOfRound(driveId, roundId){
        return http.get('/api/drive/' + driveId + '/round/' + roundId+'/')
    }    

    addStudentToNextRound(driveId, roundId, data){
        return http.patch('/api/drive/' + driveId + '/round/' + roundId + '/', data)
    }

    deleteStudentFromRound(driveId, roundId, data){
        let url = '/api/drive/' + driveId + '/round/' + roundId + '/';
        return http.delete(url, {data:{student_id: data}})
    }
    exportRoundStudents(driveId,roundId){
        return http.get(`/api/drive/${driveId}/round/${roundId}/export/`,{responseType: 'blob'})
    }
}

export default new RoundsService();