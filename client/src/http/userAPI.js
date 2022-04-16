import {host} from './index'
import {CustomResponse} from "./Response";

export const registerOnServer = async (login, password) => {
    try{
        const data = await host.post('main/user/registration', {login, password});
        return new CustomResponse(false, data);
    }catch(e){
        return new CustomResponse(true, e);
    }
}

export const loginOnServer = async (login, password) => {
    try{
        const data = await host.post('main/user/login', {login, password});
        return new CustomResponse(false, data);
    }catch(e){
        return new CustomResponse(true, e);
    }
}