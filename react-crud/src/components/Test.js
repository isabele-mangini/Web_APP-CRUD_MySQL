import React, { useState, useEffect } from "react"; 
import TestService from "../services/TestService";
import { useParams } from "react-router-dom"; 

const Test = props => {
    const initialTestState = {
        id: null,
        scenario: "",
        test: "",
        orig: "",
        agr: "",
        cat: "",
        n_ugts: "",
        objet_du_test: ""
    };

    const [currentTest, setCurrentTest] = useState(initialTestState);
    const [message, setMessage] = useState("");
    const { id } = useParams() 

    const getTest = id => {
        TestService.get(id)
            .then(response => {
                setCurrentTest(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTest(id);
    }, [id])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTest({...currentTest, [name]: value});
    };

    const updateTest = () => {
        TestService.update(currentTest.id, currentTest)
        .then(response => {
            console.log(response.data);
            setMessage("Test a bien été mis à jour");
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div>
          {currentTest ? (
            <div className="edit-form">
              <h4>Test</h4>
              <form>

                <div className="form-group">
                  <label htmlFor="title">Scenario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="scenario"
                    name="scenario"
                    value={currentTest.scenario}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Test</label>
                  <input
                    type="text"
                    className="form-control"
                    id="test"
                    name="test"
                    value={currentTest.test}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Orig</label>
                  <input
                    type="text"
                    className="form-control"
                    id="orig"
                    name="orig"
                    value={currentTest.orig}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Agr</label>
                  <input
                    type="text"
                    className="form-control"
                    id="agr"
                    name="agr"
                    value={currentTest.agr}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Cat</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cat"
                    name="cat"
                    value={currentTest.cat}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">N° UGTS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="n_ugts"
                    name="n_ugts"
                    value={currentTest.n_ugts}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Objet du Test</label>
                  <input
                    type="text"
                    className="form-control"
                    id="objet_du_test"
                    name="objet_du_test"
                    value={currentTest.objet_du_test}
                    onChange={handleInputChange}
                    />
                </div>
              </form>
    
              <button
                type="submit"
                className="btn btn-success"
                onClick={updateTest}
              >
                Mettre à Jour
              </button>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Test...</p>
            </div>
          )}
        </div>
      );

};

export default Test;