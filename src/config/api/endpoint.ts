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