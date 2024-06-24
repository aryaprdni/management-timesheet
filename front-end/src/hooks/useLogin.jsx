import { useState } from "react";
import { useDispatch } from "react-redux";
import { API } from "../libs/axios";
import { AUTH_LOGIN } from "../store/slice/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function useLogin() {
    const dispatch = useDispatch();
    
    const [form, setForm] = useState({
        nama_karyawan: "",
        rate: 0,
    });

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }
 
    async function handleLogin(setTabIndex) {
        try {
            const response = await API.post("/api/users/login", form);
            console.log(response);
            dispatch(AUTH_LOGIN(response.data));
            if (response.status === 200) {
                toast.success("Login Success");
                setTabIndex(0); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { handleLogin, handleChange };
}
