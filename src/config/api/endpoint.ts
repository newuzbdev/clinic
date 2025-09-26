export const loginEndpoint = {
    login: '/users/login_user',
    refresh:'/users/login_user',
    logOut:'/users/logout'
}

export const usersEndpoint = {
    addUser: '/users/add_user',
    getAllUsers: '/users/all_users',
    updateUser: (id: string) => `/users/update_user/${id}`,
    deleteUser: (id: string) => `/users/delete_user/${id}`
}

export const departamentEndpoint = {
    addDepartament: '/departament/add_departament',
    getAllDepartaments: '/departament/all_departaments',
    updateDepartament: (id: string) => `/departament/update_departament/${id}`,
    deleteDepartament: (id: string) => `/departament/delete_departament/${id}`
}

export const serviceEndpoint = {
    addService: '/service/add_service',
    getAllServices: '/service/all_services',
    updateService: (id: string) => `/service/update_service/${id}`,
    deleteService: (id: string) => `/service/delete_service/${id}`
}