import { ToastAndroid } from "react-native";

let errorHandler = (error: any) => {
    // console.log(error,"<==erorororo")
    let errorMessage = error.response.data['errors'][0] || {"errors": ["Someting went wrong"]};
    console.log('error inside errorHadler' , error.response.data['errors'][0]);
    // if (error.status === 401) {
    // } else if (error.error.errors) {
    //   errorMessage = Array.isArray(error.error.errors)
    //     ? error.error.errors[0]
    //     : error.error.errors.msg;
    // } else if (error.error.msg) {
    //   errorMessage = error.error.msg;
    // } else {
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.msg}`;
    // }
 
    // return  this.messageService.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: errorMessage,
    // });
    console.log('errorMessageerrorMessage', errorMessage)
 return ToastAndroid.show(errorMessage,ToastAndroid.SHORT)

    
  };

  export default errorHandler