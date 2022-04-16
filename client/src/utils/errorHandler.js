export function errorHandle(res, setErrorMessage, setShowError){
    const {isError, errorMessage, status} = res;
    if(isError){
        setErrorMessage(`${status == undefined ? '' : status} (${errorMessage})`);
        setShowError(true);
        return true;
    }
    return false;
}