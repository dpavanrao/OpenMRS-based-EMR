import React, { Component } from 'react';
import './Global.css';
import { SystemAdministration, PatientRegistration, ActiveVisits, AppointmentScheduling,
     CaptureVitals, DataManagement, FindPatientRecords, ConfigureMetadata } from './Widgets';
import Sidebar from './Sidebar'

class Dashboard extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            roles: this.props.location.state.roles,
            widgets: [],
            mount: ""
        }
        this.mountWidget=this.mountWidget.bind(this);
    }
    
    mountWidget(e) {
        this.setState({
            mount: e.key
        })
    }

    render() {
        console.log(this.props)
        const rolesList = this.props.location.state.roles;
        const doctor = ['Find Patient Records', 'Active Visits', 'Appointment Scheduling'];
        const systemDeveloper = ['Data Management', 'Configure Metadata', 'System Administration'];
        const provider = ['Find Patient Records', 'Active Visits', 'Appointment Scheduling', 'Register a Patient', 'Capture Vitals'];
        let widgetsList=[];

        if( rolesList.filter(element => (element.name === 'Organizational: Doctor')).length ){
            //widgetsList = [...doctor];
            widgetsList = widgetsList.concat(doctor);
        }
        if( rolesList.filter(element => (element.name === 'Provider')).length ){
            //widgetsList = [...provider];
            widgetsList = widgetsList.concat(provider);
        }
        if( rolesList.filter(element => (element.name === 'System Developer')).length ){
            //widgetsList = [...systemDeveloper];
            widgetsList = widgetsList.concat(systemDeveloper);
        }

        let widgets = widgetsList.map((d) => <div key={d}> {d}</div>);
        
        let component;
        switch(this.state.mount){
            case 'Register a Patient':
                component = <PatientRegistration auth={this.props.location.state.auth} 
                username={this.props.location.state.username} password={this.props.location.state.password}/>;
                break;
            case 'System Administration':
                component = <SystemAdministration />;
                break;
            case 'Active Visits':
                component = <ActiveVisits/>;
                break;
            case 'Appointment Scheduling':
                component = <AppointmentScheduling />;
                break;
            case 'Capture Vitals':
                component = <CaptureVitals />;
                break;
            case 'Data Management':
                component = <DataManagement />;
                break;
            case 'Find Patient Records':
                component = <FindPatientRecords auth={this.props.location.state.auth}/>;
                break;
            case 'Configure Metadata':
                component = <ConfigureMetadata />;
                break;
            default:
                component = null;
            
        } 
        // const privilegesList = this.props.location.state.privileges;
        // const privileges = privilegesList.map((d) => <div key={d.name}>{d.name}</div>);
        // const box = roles.map((rl)=>(<><div className="Widget"><h1>{rl}</h1></div><br/></>));
        return (
            <>
            <Sidebar widgets={widgets} mountWidget={this.mountWidget}/>
            <div style={{marginLeft: '20vw'}}>
                {component}
            </div>
            
            </>
        )
    }
}

export default Dashboard

