export const loginStart =(userCredentials)=>({
    type:'LOGIN_START',
});

export const loginSuccess = (user)=>({
    type: 'LOGIN_SUCCESS',
    payload: user
});

export const loginFailure = ()=>({
    type: 'LOGIN_FAILURE'
});

export const logout = ()=>({
    type: 'LOGOUT'
});

export const update = ()=>({
    type: 'UPDATE'
})