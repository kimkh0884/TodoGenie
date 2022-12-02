//Server <-> Client communication API
import axios from 'axios';
import CryptoJS from "crypto-js";

const server_url = "";

const register = (username, id, pw) => {
    const data = {
        userName: username,
        userId: id,
        password: pw
    };
    
    axios.post((server_url + "/users/sign_up"), data).then((res) => {
        return true;
    }).catch((e) => {
        console.log(e);
        return false;
    });
};

const login = (id, pw) => {
    const data = {
        userId: id,
        password: pw
    };
    
    axios.post((server_url + "/users/login"), data).then((res) => {
        return true;
    }).catch((e) => {
        window.alert(e);
        return false;
    });
};

const logout = () => {    
    axios.get((server_url + "/users/logout")).then((res) => {
        return true;
    }).catch((e) => {
        window.alert(e);
        return false;
    });
};

const loadTodo = (start, end) => {
    const ps = {
        start: start,
        end: end
    };
    
    axios.get((server_url + "/todos"), {params: ps}).then((res) => {
        return res;
    }).catch((e) => {
        window.alert(e);
        return [];
    });
};

const addTodo = (title, start, end) => {
    const data = {
        title: title,
        start: start,
        end: end
    };
    
    axios.post((server_url + "/todos"), data).then((res) => {
        return true;
    }).catch((e) => {
        window.alert(e);
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
    
    axios.put((server_url + "/todos/:" + id), data).then((res) => {
        return true;
    }).catch((e) => {
        window.alert(e);
        return false;
    });
};

const deleteTodo = (id) => {    
    axios.delete((server_url + "/todos:" + id)).then((res) => {
        return true;
    }).catch((e) => {
        window.alert(e);
        return false;
    });
};

const KEY = "WfH+%ug%G?TT=G/FY9z!6M}aqAQg?]pz";

const saveAuthInfo = (authinfo) => {
    let encrypted_info = CryptoJS.AES.encrypt(JSON.stringify(authinfo), KEY).toString();
    let dt = new Date();
    dt.setDate(date.getDate()+1);
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

export {register, login, logout, loadTodo, addTodo, editTodo, deleteTodo, saveAuthInfo, searchAuthInfo};