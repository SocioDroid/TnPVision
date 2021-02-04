import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';
import HttpUrl from './HttpUrl';

class DriveService {
    getAllDrives() {
        return http.get('/api/drive/')
    }
    addSingleDrive(data){
        return HttpUrl.post('/api/drive/', data)
    }
    getSingleDrive(data){
        return httpauth.get(`/api/drive/${data.id}`)
    }

    deleteDrive(data){
        return http.delete(`/api/drive/${data.id}`)
    }
}

export default new DriveService();