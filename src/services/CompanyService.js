import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';

class CompanyService {
    getAllCompanies() {
        return http.get('/api/company/')
    }
    addSingleCompany(data){
        return httpauth.post('/api/company/', data)
    }
    editSingleCompany(value,data){
        return http.patch(`/api/company/${value.id}/`,data)
    }
    getSingleCompany(data){
        return httpauth.get(`/api/company/${data.id}`)
    }

    deleteCompanies(data){
        return http.delete(`/api/company/${data.id}`)
    }
}

export default new CompanyService();