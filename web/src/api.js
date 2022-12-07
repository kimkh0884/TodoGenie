//Server <-> Client communication API
import axios from 'axios';
import CryptoJS from "crypto-js";

const server_url = "http://localhost:8000";

const axiosInstance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': 'https://localhost:8000'
    },
    baseURL: server_url
});

const register = (username, id, pw, success, fail) => {
    const data = {
        userName: username,
        userId: id,
        password: pw
    };
    
    axiosInstance.post("/users/sign_up", data, {withCredentials: true}).then((res) => {
        if (res.data === "user name already exists") {
            fail();
        }
        else {
            success();
        }
        //console.log(res);
    }).catch((e) => {
        console.log("register: "+e);
        fail();
    });
};

const checkLoggedIn = (success, fail) => {    
    axiosInstance.get("/users/login", {withCredentials: true}).then((res) => {
        if (res.data === "Not Logged In") {
            fail();
        }
        else {
            success(res.data.userId);
        }
    }).catch((e) => {
        console.log("checkLoggedIn: "+e);
        fail();
    });
};

const login = (id, pw, success, fail) => {
    const data = {
        userId: id,
        password: pw
    };
    
    axiosInstance.post("/users/login", data, {withCredentials: true}).then((res) => {
        if (res.data === "Wrong Password") {
            fail("\nPassword is wrong.");
        }
        else if (res.data === "No matching ID") {
            fail("\nID is wrong.");
        }
        else {
            success(res);
        }
    }).catch((e) => {
        console.log("login: "+e);
        fail("");
    });
};

const logout = (success, fail) => {    
    axiosInstance.get("/users/logout", {withCredentials: true}).then((res) => {
        if (res.data === "Logged out") {
            success();
        }
        else {
            fail();
        }
    }).catch((e) => {
        console.log("logout: "+e);
        fail();
    });
};

const loadTodo = (start, end, success, fail) => {
    const ps = {
        start: start,
        end: end
    };
    
    axiosInstance.get("/todos", {params: ps, withCredentials: true}).then((res) => {
        success(res.data);
    }).catch((e) => {
        console.log("loadTodo: "+e);
        fail();
    });
};

const searchTodo = (keyword, success, fail) => {
    const ps = {
        keyword: keyword
    };
    
    axiosInstance.get("/todos/search", {params: ps, withCredentials: true}).then((res) => {
        success(res.data);
    }).catch((e) => {
        console.log("searchTodo: "+e);
        fail();
    });
};

const addTodo = (title, start, end, success, fail) => {
    const data = {
        title: title,
        start: start,
        end: end
    };
    
    axiosInstance.post("/todos", data, {withCredentials: true}).then((res) => {
        success();
    }).catch((e) => {
        console.log("addTodo: "+e);
        fail();
    });
};

const editTodo = (id, title, start, end, state, success, fail) => {
    const data = {
        title: title,
        start: start,
        end: end,
        state: state
    };
    
    axiosInstance.put("/todos/" + id, data).then((res) => {
        success();
    }).catch((e) => {
        console.log("editTodo: "+e);
        fail();
    });
};

const deleteTodo = (id, success, fail) => {    
    axiosInstance.delete("/todos/" + id).then((res) => {
        success();
    }).catch((e) => {
        console.log("deleteTodo: "+e);
        fail();
    });
};

const getRecommendations = (success, fail) => {    
    axiosInstance.get("/todos/recommendation").then((res) => {
        success(res);
    }).catch((e) => {
        console.log("getRecommendations: "+e);
        fail();
    });
};

const KEY = "WfH+%ug%G?TT=G/FY9z!6M}aqAQg?]pz";

const saveAuthInfo = (authinfo, mode) => {
    let encrypted_info = CryptoJS.AES.encrypt(JSON.stringify(authinfo), CryptoJS.enc.Utf8.parse(KEY), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    }).toString();
    let dt = new Date();
    dt.setDate(dt.getDate()+1);
    document.cookie = "dL7uM4gyk4="+encrypted_info+";path=/;expires="+dt.toUTCString()+";";
};

const searchAuthInfo = () => {
    let regex = new RegExp("dL7uM4gyk4=([^;]*)");

    if (regex.test(document.cookie)) {
        let encrypted_info = (regex.exec(document.cookie))[0].substring(11);
        let decryted_info = CryptoJS.AES.decrypt(encrypted_info, CryptoJS.enc.Utf8.parse(KEY), {
            iv: CryptoJS.enc.Utf8.parse(""),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryted_info);
    }
    else {
        return null;
    }
};

const deleteAuthInfo = () => {
    document.cookie = "dL7uM4gyk4=none;path=/;expires=Thu, 01 Jan 1999 00:00:10 GMT;";
}

export {register, checkLoggedIn, login, logout, loadTodo, searchTodo, addTodo, editTodo, deleteTodo, getRecommendations, saveAuthInfo, searchAuthInfo, deleteAuthInfo};