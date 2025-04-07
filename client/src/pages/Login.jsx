import React from 'react'

const Login = (props) => {
    const AUTH_URL = `${props.api_url}/auth/github`

    return (
        <div>
            <a href={AUTH_URL}>
                <button className='login'>Login with GitHub</button>
            </a>
        </div>
    )
}

export default Login