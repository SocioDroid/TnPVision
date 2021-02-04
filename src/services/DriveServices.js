import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';

class DriveService {
    addDrive(data) {
        return httpauth.post('/api/drive/', data)
    }
}

export default new DriveService();