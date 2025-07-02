import axios from "axios";
import { useRouter } from "next/navigation";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    response => response,
    error => {
        if(typeof window !== 'undefined') {
            const status = error.response?.status;
            const router = useRouter();
            if(status === 401){
                router.push('/auth/login');
            }else if(status === 403){
                router.push('/forbidden')
            }
        }
    }
)

export default api;