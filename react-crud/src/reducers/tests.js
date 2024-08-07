import {
    CREATE_TEST,
    RETRIEVE_TESTS,
    UPDATE_TEST,
    DELETE_TEST
} from "../actions/types";

const initialState = [];

function testReducer(tests = initialState, action) {
    const {type, payload} = action;

    switch (type){
        case CREATE_TEST:
            return [...tests, payload];
        
        case RETRIEVE_TESTS: 
            return payload; 
        
        case UPDATE_TEST:
            return tests.map((test) => {
                if (test.id === payload.id){
                    return {
                        ...test,
                        ...payload,
                    };
                } else { 
                    return test; 
                }
            });
        
        case DELETE_TEST: 
            return tests.filter(({id}) => id !== payload.id);  
        
        default: 
        return tests;
    }
};

export default testReducer; 