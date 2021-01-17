import http from './HttpUrl';

class AllServices{
    getAll(){
        return http.get('/register');
    }
    getSingle(email){
        return http.get(`/register/${email}`);
    }
    create(data) {
        return http.post("/register/", data);
    }
    getUser(email, password){
        return http.post("/login", email, password);
    }
}

export default new AllServices();