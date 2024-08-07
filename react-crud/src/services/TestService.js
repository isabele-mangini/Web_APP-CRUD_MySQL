import http from "../http-common"

const getAll = (params) => {
    return http.get("/test", { params });
};

const getAll_ugts = (params) => {
    return http.get("/test/ugts", { params });
};

const get = id => {
    return http.get(`/test/${id}`);
};

const get_ugts = id => {
    return http.get(`/test/ugts/${id}`);
};
 
const create = data => { 
    return http.post("/test", data);
};

const create_ugts = data => { 
    return http.post("/test/ugts", data);
};

const update = (id, data) => {
    return http.put(`/test/${id}`, data);
};

const update_ugts = (id, data) => {
    return http.put(`/test/ugts/${id}`, data);
};

const remove = id => {
    return http.delete(`/test/${id}`);
};

const remove_ugts = id => {
    return http.delete(`/test/ugts/${id}`);
};

const findByTitle = title => {
    return http.get(`test?title=${title}`);
};

const findByTitle_ugts = title => {
    return http.get(`test?title=${title}`);
};

const TestService = {
    getAll,
    getAll_ugts,
    get,
    get_ugts,
    create,
    create_ugts,
    update,
    update_ugts,
    remove,
    remove_ugts,
    findByTitle,
    findByTitle_ugts
};

export default TestService;