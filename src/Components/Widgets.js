import React, { Component } from 'react';
import './Global.css';
const axios = require('axios').default;


class ActiveVisits extends Component{
    render(){
        return(
            <div>
                Active Visits widget
            </div>
        )
    }
}


class AppointmentScheduling extends Component{
    render(){
        return(
            <div>
                Appointment Scheduling widget
            </div>
        )
    }
}


class CaptureVitals extends Component{
    render(){
        return(
            <div>
                Capture Vitals widget
            </div>
        )
    }
}


class ConfigureMetadata extends Component{
    render(){
        return(
            <div>
                Configure Metadata widget
            </div>
        )
    }
}


class DataManagement extends Component{
    render(){
        return(
            <div>
                Data Management widget
            </div>
        )
    }
}


class FindPatientRecords extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            query: '',
            response: []
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSearch = () => {
        var config = {
            method: 'get',
            url: 'http://localhost:8080/openmrs/ws/rest/v1/person?v=full&q='+this.state.query,
            headers: { 
                'Authorization':  this.props.auth
            }, 
        };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            this.setState({
                response: response.data.results,
                query: ''
            })
        })
        .catch(function (error) {
            console.log(error);
            alert('Server down');
        });
    }

    render(){
        let responseArray=this.state.response;
        let searchResults
        if(responseArray.length > 0){
            searchResults = this.state.response.map((d) => 
                <table className="SearchPatientRecordTable">
                    <tr>
                        <td style={{width: "20vw"}}>{d.display}</td>
                        <td style={{width: "20vw"}}>{d.age}</td>
                        <td style={{width: "20vw"}}>{d.gender}</td>
                    </tr>
                </table>)
        }
        else if(this.state.query.length>0){
            searchResults = <div>No match found</div>
        }
        else{
            searchResults = null    
        }
        return(
            <div>
                <br/>
                <input
                    className="SearchPatientRecordSearchbar" 
                    placeholder="Search patient record"
                    name="query"
                    onChange={this.handleChange}
                />
                <input
                    type="submit" 
                    onClick={this.handleSearch} 
                    className="SearchPatientRecordSearchbutton"
                    value="Search"
                />
                <div style={{height: 50}} />
                <table className="SearchPatientRecordTable">
                    <th style={{width: "20vw"}}>Name</th>
                    <th style={{width: "20vw"}}>Age</th>
                    <th style={{width: "20vw"}}>Gender</th>
                </table>
                {searchResults}
            </div>
        )
    }
}


class PatientRegistration extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            firstName: '',
            lastName: '',
            gender: 'M',
            birthDate: '',
            address: '',
            cityVillage: '',
            country: '',
            pinCode: '',
            phoneNumber: '',
        }
        this.handleRegister=this.handleRegister.bind(this)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleRegister(e) {
        e.preventDefault();
        // let header = `JSESSIONID=${this.props.jsessionid}`
        // console.log(header);
        
        const validate = ({ firstName, lastName }) => {
            return {
              firstName: !firstName || firstName.trim().length === 0
                ? "First Name is required"
                : false,
              lastName:
                !lastName || lastName.trim().length === 0
                  ? "Last Name is required"
                  : false
             };
          };

        let initialState = {
            firstName: '',
            lastName: '',
            gender: 'M',
            birthDate: '',
            address: '',
            cityVillage: '',
            country: '',
            pinCode: '',
            phoneNumber: '',
            aadhaar: ''
        } 
        var config1 = {
            method: 'get',
            url: 'http://localhost:8080/openmrs/ws/rest/v1/personattributetype',
            headers: {
                'Authorization': this.props.auth
            }
        }

        var data1 = JSON.stringify({
            "names":[{
                "givenName":this.state.firstName,
                "familyName":this.state.lastName
            }],
            "gender":this.state.gender,
            "birthdate":this.state.birthDate,
            "addresses":[{
                "address1":this.state.address,
                "cityVillage":this.state.cityVillage,
                "country":this.state.country,
                "postalCode":this.state.pinCode
            }],
            "attributes":[
                {
                "attributeType": "72c17d26-6860-4d82-92f6-d88f0d4d6ece",
                "value": this.state.aadhaar
                }
            ] 
        });

        var config1 = {
            method: 'post',
            url: 'http://localhost:8080/openmrs/ws/rest/v1/person',
            headers: { 
                'Authorization': this.props.auth, 
                'Content-Type': 'application/json', 
            },
            // withCredentials: true,
            // 'Access-Control-Allow-Credentials': true,
            data: data1
        };

        var data2; 
        
        axios(config1)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.status===201){
                alert('person successfully registered')
                
                data2 = JSON.stringify({
                    "person": response.data.uuid,
                    "identifiers": [
                      {
                        "identifier": "2",
                        "identifierType": "OpenMRS ID",
                        "preferred": true
                      }
                    ]
                })
            }
            else{
                alert(response.data.error.message)
            }
        })
        .catch(function (error) {
            console.log(error);
            alert(error.message)
        });


    }
    
    render() {
        
        return (
            <form >
                <br/>
                <label style={{fontWeight: "600", fontSize: 18, fontFamily: "Lora"}}>Full Name</label>
                <br/>
                <input 
                    name="firstName"
                    className="RegistrationFormInputSmall"
                    style={{marginRight: "1vw"}}
                    placeholder="Given name"
                    value={this.state.firstName} 
                    onChange={this.handleChange} 
                />
                <input 
                    name="lastName"
                    className="RegistrationFormInputSmall"
                    placeholder="Family name"
                    value={this.state.lastName} 
                    onChange={this.handleChange} 
                />
                <br/>
                <label style={{fontWeight: "600", fontSize: 18, fontFamily: "Lora"}}>Gender </label>
                <select name="gender" value={this.state.gender} onChange={this.handleChange} style={{width:"6vw", height: 30, fontSize: 15, borderRadius: 3}}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="U">Unspecified</option>
                </select>
                <br/>

                <label style={{fontWeight: "600", fontSize: 18, fontFamily: "Lora"}}>Birth Date </label>                
                <input 
                    name="birthDate"
                    className="RegistrationFormInputSmall"
                    type="date"
                    value={this.state.birthDate} 
                    onChange={this.handleChange} 
                />        
                <br/>

                <label style={{fontWeight: "600", fontSize: 18, fontFamily: "Lora"}}>Address</label>
                <br/>
                <input 
                    style={{left: "15vw"}}
                    name="address"
                    className="RegistrationFormInputLarge"
                    placeholder="Door no/Name/Locality"
                    value={this.state.address} 
                    onChange={this.handleChange} 
                />
                <br/>
                <input 
                    name="cityVillage"
                    className="RegistrationFormInputSmall"
                    placeholder="City / Village"
                    style={{marginRight: "1vw"}}
                    value={this.state.cityVillage} 
                    onChange={this.handleChange} 
                />
                <input 
                    name="country"
                    className="RegistrationFormInputSmall"
                    placeholder="Country"
                    value={this.state.country} 
                    onChange={this.handleChange} 
                />
                <br/>

                <input 
                    name="pinCode"
                    className="RegistrationFormInputSmall"
                    placeholder="PIN code"
                    value={this.state.pinCode}
                    style={{marginRight: "1vw"}}
                    type="number" 
                    onChange={this.handleChange} 
                />
                <input 
                    name="phoneNumber"
                    className="RegistrationFormInputSmall"
                    type="number"
                    placeholder="10 digit phone number"
                    value={this.state.phoneNumber} 
                    onChange={this.handleChange}
                    min="1000000000"
                    max="9999999999" 
                />
                <br/>
                <input 
                    style={{left: "15vw"}}
                    name="aadhaar"
                    className="RegistrationFormInputLarge"
                    placeholder="Aadhaar number"
                    value={this.state.aadhaar} 
                    onChange={this.handleChange} 
                />                
                <br/><br/>
                <button className="RegistrationFormSubmitButton" onClick={(e) => this.handleRegister(e)}>Register</button>
            </form>
        )
        
    }
    
}


class SystemAdministration extends Component{
    render(){
        return(
            <div>
                System Administration widget
            </div>
        )
    }
}

export {SystemAdministration, PatientRegistration, FindPatientRecords, ActiveVisits, CaptureVitals,
    ConfigureMetadata, DataManagement, AppointmentScheduling}

