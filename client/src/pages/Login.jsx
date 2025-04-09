import React from 'react'

const Login = (props) => {

    const AUTH_URL = 'http://localhost:3001/auth/github'

    return (
        <div>
            <h1>Flight-Aid</h1>
                <a href={AUTH_URL}>
                    <button> 🔒 Login via Github </button>
                </a>
        </div>
    )
}

export default Login
