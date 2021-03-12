import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';
import HttpUrl from './HttpUrl';

class DriveService {
    getAllDrives() {
        return httpauth.get('/api/drive/')
    }
    addSingleDrive(data){
        return HttpUrl.post('/api/drive/', data)
    }
    getSingleDrive(data){
        return httpauth.get(`/api/drive/${data.id}/`)
    }
    deleteDrive(data){
        return http.delete(`/api/drive/${data.id}/`)
    }
    getDriveVolunteers(data){
        return http.get(`/api/drive/${data.id}/volunteer/`)
    }
    deleteDriveVolunteers(data,id){
        return http.delete(`/api/drive/${data.id}/volunteer/${id}`)
    }
    addDriveVolunteers(id,data){
        return http.patch(`/api/drive/${id}/volunteer/`, data)
    }

    getDriveCoordinators(data){
        return http.get(`/api/drive/${data.id}/co-ordinator/`)
    }
    deleteDriveCoordinators(data,id){
        return http.delete(`/api/drive/${data.id}/co-ordinator/${id}`)
    }
    addDriveCoordinators(id,data){
        return http.patch(`/api/drive/${id}/co-ordinator/`, data)
    }

    getDriveInterviewers(data){
        return http.get(`/api/drive/${data.id}/interviewer/`)
    }
    deleteDriveInterviewer(data,id){
        return http.delete(`/api/drive/${data.id}/interviewer/${id}/`)
    }
    addDriveInterviewers(id,data){
        return http.patch(`/api/drive/${id}/interviewer/`, data)
    }
    downloadEligible(id){
        return http.get(`/api/drive/${id}/eligible/`, {responseType: 'blob'})
    }
    eligibleToShortlisted(id){
        return http.get(`/api/drive/${id}/eligibletoshortlisted/`)
    }
    changeStatus(id, data){
        return http.post(`/api/drive/${id}/status/`, data)
    }
}

export default new DriveService();