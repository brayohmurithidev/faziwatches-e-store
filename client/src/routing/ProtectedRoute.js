import {useSelector} from 'react-redux'
import {NavLink, Outlet} from 'react-router-dom'
import {Security} from "@mui/icons-material";

const ProtectedRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)

    // show unauthorized screen if no user is found in redux store
    if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
        return (
            <div className='unauthorized'>
                <p>
                    <Security sx={{fontSize: '100px'}}/>
                </p>
                <h1>
                    Opps! You cannot access this page
                </h1>
                <span>
          <NavLink style={{color: 'var(--primary-color)'}} to='/login'>Login</NavLink> to gain access
        </span>
            </div>
        )
    }

    // returns child route elements
    return <Outlet/>
}
export default ProtectedRoute