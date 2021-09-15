export const Logout = () => ({
    type : "LOGOUT"
})

export const Login = (user) => ({
    type : "LOGIN",
    payload : user
})
