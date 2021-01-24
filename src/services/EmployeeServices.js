import http from './HttpUrl';
import httpauth from './AuthorizedHttpUrl';

class EmployeeServices{
    // getAll(){
    //     return http.get('/register');
    // }
    // getSingle(email){
    //     return http.get(`/register/${email}`);
    // }
    // create(data) {
    //     return http.post("/register/", data);
    // }
    // getUser(email, password){
    //     return http.post("/login", email, password);
    // }

    getAllEmployee() {
        return httpauth.get('/api/employees/')
    }

    getSingleEmployee(data){
        return httpauth.get(`/api/employee/${data.id}`)
    }

    getEmployeeDetail(){
        return httpauth.get('/api/user/')
    }

    deleteEmployee(data){
        return httpauth.delete(`/api/employee/${data.id}`)
    }
}

export default new EmployeeServices();