import httpauth from './AuthorizedHttpUrl';

class EmployeeServices{

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

    searchEmployee(inputValue){
        return httpauth.get('api/employee/search/?q=', inputValue)
    }

    
}

export default new EmployeeServices();