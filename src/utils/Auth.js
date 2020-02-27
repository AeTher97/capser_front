import axios from "axios";


export default class Auth {

    async signIn(username, password) {


        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const url = `${process.env.REACT_APP_CAPSER_BACKEND}/perform/login`;

        try {
            const axiosInstance = axios.create();
            const res = await axiosInstance.post(url, formData, {withCredentials: true});

            console.log(res.headers['set-cookie'])
            // document.cookie = res.headers
            return {
                username: res.data.username,
                id: res.data.id
            };
        } catch (e) {
            console.log("Invalid credentials");
            return undefined;
        }
    }


}
