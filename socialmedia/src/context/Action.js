export const Logout = () => ({
    type : "LOGOUT"
})

export const Login = (user) => ({
    type : "LOGIN",
    payload : user
})

export const Update = (user) => ({
    type: "UPDATE",
    payload: user
})