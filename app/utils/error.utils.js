const extractErrorMessage = (error) => {
    let errorMessage = '';
    if (error.hasOwnProperty('errors')) {
        for (const err of error.errors) {
            errorMessage += err.message + '\n';
        }
    } else {
        errorMessage = error;
    }
    return errorMessage;
}

export default extractErrorMessage;

