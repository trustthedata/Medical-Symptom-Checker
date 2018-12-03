import React, { Component } from "react";
// import Checkbox from "./Checkbox";
import "./App.css";
import axios from "axios";

const TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const language = "en-gb";

interface ISymptoms {
  Name: string;
  ID: number;
}

interface IAppProps {}

interface IAppState {
  symptoms: ISymptoms[];
}
class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      symptoms: []
      // selectedSymptoms: {
      //   name: {
      //     checked: false
      //   }
      // }
    };
  }

  // componentWillMount = () => {
  //   this.selectedCheckboxes = new Set();
  // };

  // toggleCheckbox = label => {
  //   if (this.selectedCheckboxes.has(label)) {
  //     this.selectedCheckboxes.delete(label);
  //   } else {
  //     this.selectedCheckboxes.add(label);
  //   }
  // };

  // handleFormSubmit = formSubmitEvent => {
  //   formSubmitEvent.preventDefault();

  //   for (const checkbox of this.selectedCheckboxes) {
  //     console.log(checkbox, "is selected");
  //   }
  // };

  // createCheckbox = label => (
  //   <Checkbox
  //     label={label}
  //     handleCheckboxChange={this.toggleCheckbox}
  //     key={label}
  //   />
  // );

  // createCheckboxes = () => this.state.symptoms.map(this.createCheckbox);

  getSymptoms = () => {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/symptoms?token=${TOKEN}&language=${language}`
      )
      .then(response => this.setState({ symptoms: response.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    const { name, value } = event.target;
    // const newState = Object.assign({}, this.state);
    // newState["symptoms"][name] = event.target.checked;
    // this.setState(newState);
    // this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Click to get a list of symptoms.</p>
          <button onClick={this.getSymptoms}>Get Symptoms</button>
        </header>
        <form className="Symptom-header">
          {/* {this.createCheckboxes()}
          <button className="btn btn-default" type="submit">
            Save
          </button> */}
          {this.state.symptoms.map(symptom => (
            <label className="Symptom-individual" key={symptom.ID}>
              <input
                name={`${symptom.Name}`}
                type="checkbox"
                value={symptom.ID}
                onChange={this.handleInputChange}
              />
              {symptom.Name}
            </label>
          ))}
        </form>
      </div>
    );
  }
}

export default App;
