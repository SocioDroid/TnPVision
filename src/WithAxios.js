import { useContext, useMemo } from 'react'
import axios from 'axios'
import UserContext from './UserContext';

const WithAxios = ({ children }) => {
    const { userData, setUserData } = useContext(UserContext);

    useMemo(() => {
        axios.interceptors.response.use(response => response, async (error) => {
            setUserData(null)
        })
    }, [setUserData])

    return children
}

export default WithAxios