import axios from 'axios';

// Ek naya axios instance create kar rahe hain
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Ye .env se URL uthaega
    withCredentials: true, // Ye cookies bhejne ke liye zaroori hai (Future proofing)
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;