import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API } from "../libs/axios";
import { CREATE_TIMESHEET, UPDATE_TIMESHEET } from "../store/slice/timesheet";

export function useTimesheet(setShowNotification) {
    const dispatch = useDispatch();
    const [dataTimesheet, setDataTimesheet] = useState([]);
    const [data, setData] = useState({
        tanggal_mulai: "",
        tanggal_berakhir: "",
        jam_mulai: "",
        jam_berakhir: "",
        judul_kegiatan: "",
        nama_proyek: ""
    });

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handlePost = async (event) => {
        try {
            event.preventDefault();
            const response = await API.post("/api/timesheet", data);
            dispatch(CREATE_TIMESHEET(response.data));
            console.log(response.data);
            if (response.status === 200) {
                setShowNotification(true); 
                setDataTimesheet(prevData => [...prevData, response.data.data]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await API.delete(`/api/timesheet/${id}`);
            if (response.status === 200) {
                setDataTimesheet(prev => prev.filter(item => item.id !== id));
                setShowNotification(true); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTimeSheet = async () => {
        try {
            const response = await API.get("/api/timesheet");
            setDataTimesheet(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id) => {
        try {
            const response = await API.patch(`/api/timesheet/${id}`, data);
            dispatch(UPDATE_TIMESHEET(response.data));
            setShowNotification(true);
            setDataTimesheet(prevData =>
                prevData.map(item => (item.id === id ? response.data.data : item))
            );
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilter = async (filter) => {
        try {
            const response = await API.get(`/api/timesheet/filter?nama_proyek=${filter}`);
            setDataTimesheet(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTimeSheet();
    }, []);

    return {
        handleFilter, data, handleChange, handlePost, setData, dataTimesheet, handleDelete, handleEdit
    }
}
