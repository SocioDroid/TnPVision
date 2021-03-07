import httpauth from './AuthorizedHttpUrl';

class EmployeeServices{

    getAllEmployee() {
        return httpauth.get('/api/employees/')
    }

    setCubeDashboard(data) {
        return httpauth.post('/api/user/cubedashboard',data )
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

    updateEmployee(id, data){
        return httpauth.patch(`api/employee/${id}`, data)
    }
    
}

export default new EmployeeServices();