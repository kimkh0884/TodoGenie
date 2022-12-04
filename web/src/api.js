//Server <-> Client communication API
import axios from 'axios';
import CryptoJS from "crypto-js";

const server_url = "http://localhost:8000";

const axiosInstance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: server_url
});

const register = (username, id, pw, success, fail) => {
    const data = {
        userName: username,
        userId: id,
        password: pw
    };
    
    axiosInstance.post((server_url + "/users/sign_up"), data).then((res) => {
        console.log(res);
        //success();
    }).catch((e) => {
        console.log("login: "+e);
        fail();
    });
};

const login = (id, pw, success, fail) => {
    const data = {
        userId: id,
        password: pw
    };
    
    axiosInstance.post((server_url + "/users/login"), data).then((res) => {
        console.log(res);
        //success();
    }).catch((e) => {
        console.log("login: "+e);
        fail();
    });
};

const logout = () => {    
    axiosInstance.get((server_url + "/users/logout")).then((res) => {
        return true;
    }).catch((e) => {
        console.log("logout: "+e);
        return false;
    });
};

const loadTodo = (start, end) => {
    const ps = {
        start: start,
        end: end
    };
    
    axiosInstance.get((server_url + "/todos"), {params: ps}).then((res) => {
        return res;
    }).catch((e) => {
        console.log("loadTodo: "+e);
        return null;
    });
};

const searchTodo = (keyword) => {
    const ps = {
        keyword: keyword
    };
    
    axiosInstance.get((server_url + "/todos/search"), {params: ps}).then((res) => {
        return res;
    }).catch((e) => {
        console.log("searchTodo: "+e);
        return null;
    });
};

const addTodo = (title, start, end) => {
    const data = {
        title: title,
        start: start,
        end: end
    };
    
    axiosInstance.post((server_url + "/todos"), data).then((res) => {
        return true;
    }).catch((e) => {
        console.log("addTodo: "+e);
        return false;
    });
};

const editTodo = (id, title, start, end, state) => {
    const data = {
        title: title,
        start: start,
        end: end,
        state: state
    };
    
    axiosInstance.put((server_url + "/todos/:" + id), data).then((res) => {
        return true;
    }).catch((e) => {
        console.log("editTodo: "+e);
        return false;
    });
};

const deleteTodo = (id) => {    
    axiosInstance.delete((server_url + "/todos:" + id)).then((res) => {
        return true;
    }).catch((e) => {
        console.log("deleteTodo: "+e);
        return false;
    });
};

const KEY = "WfH+%ug%G?TT=G/FY9z!6M}aqAQg?]pz";

const saveAuthInfo = (authinfo) => {
    let encrypted_info = CryptoJS.AES.encrypt(JSON.stringify(authinfo), KEY).toString();
    let dt = new Date();
    dt.setDate(dt.getDate()+1);
    document.cookie = "dL7uM4gyk4="+encrypted_info+";path=/;expires="+dt.toUTCString()+";";
}

const searchAuthInfo = () => {
    let regex = new RegExp("dL7uM4gyk4=([^;]*)");
    if (regex.test(document.cookie)) {
        let encrypted_info = RegExp.exec(document.cookie);
        let decryted_info = CryptoJS.AES.decrypt(encrypted_info, KEY).toString();
        return JSON.parse(decryted_info);
    }
    else {
        return null;
    }
}

export {register, login, logout, loadTodo, searchTodo, addTodo, editTodo, deleteTodo, saveAuthInfo, searchAuthInfo};