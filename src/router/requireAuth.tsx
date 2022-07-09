import { useAppSelector } from "../types/hook.type";

function requireAuth(){
    let token = useAppSelector((state)=> state.user.token)

    if (!token){
        token = localStorage.getItem('auth')
    }
}