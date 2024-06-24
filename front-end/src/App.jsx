import { useEffect } from 'react';
import Header from './components/Headerr';
import Content from './components/Content';
import { API, setAuthToken } from './libs/axios';
import { useDispatch } from 'react-redux';
import { AUTH_CHECK } from './store/slice/authSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkAuth() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }
                setAuthToken(token);
                const response = await API.get("/api/user");
                dispatch(AUTH_CHECK(response.data));
            } catch (error) {
                console.error('Authentication failed:', error.message);
            }
        }

        checkAuth();
    }, [dispatch]);

    return (
        <>
            <Header />
            <Content />
        </>
    );
}

export default App;
