import React, { Component } from 'react';
import './App.css';
import './bootstrap/css/bootstrap.css';
import './font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [],// id unique ,name,status
            isDisplayForm:false,
            taskEditing : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sortBy : 'name',
            sortValue:1
        }
    }
    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks:tasks
            });
        }
    }

    onToggleForm = () =>{
        this.setState({
            isDisplayForm : true,
            taskEditing:null
        });
    }
    onShowForm = () =>{
        this.setState({
            isDisplayForm : true
        });
    }
    onCloseForm = () =>{
        this.setState({
            isDisplayForm : false
        });
    }
    onSubmit = (data) =>{
        var {tasks} = this.state;
        if(data.id === ''){
            data.id = this.generateID();
            tasks.push(data);
        }
        else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }

        this.setState({
            tasks : tasks,
            taskEditing : null
        });
        this.onCloseForm();
       localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    onUpdateStatus = (id) =>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        console.log(index);
        if(index!==-1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks:tasks
            });
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
    }
    onDeleteItem = (id) =>{
        console.log(id);
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index!==-1){
            tasks.splice(index,1);
            this.setState({
                tasks : tasks
            });     
           localStorage.setItem("tasks",JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    onUpdate = (id) =>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];       
        this.setState({
            taskEditing : taskEditing 
        });
        this.onShowForm();
    }
    onFilter = (filterName,filterStatus) =>{
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter : {
                name : filterName,
                status : filterStatus
            }
        });
    }
    onSearch = (data) =>{
        this.setState({
            keyword:data
        });
    }
    onSort = (data,data2) =>{
        this.setState({
            sortBy :data,
            sortValue:data2
        });
        // console.log(data,data2);
    }
    findIndex = (id) =>{
        var {tasks} = this.state;
        var res = -1;
        tasks.forEach(function(task,index){
            if(task.id === id){         
                res = index;
                return;
            }
        });
        return res;
    }

    s4(){
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
        this.s4() + '-' + this.s4() +  this.s4() +  this.s4() ;
    }
    render(){
        
        var { tasks,isDisplayForm,taskEditing,filter,keyword,sortBy,sortValue } = this.state;
        
        console.log(tasks);
        if(filter){
            if(filter.name){
            tasks =  tasks.filter(function(task){
                    return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) >-1;
                });
            }
            tasks = tasks.filter((task) =>{
                if(filter.status===-1){
                    return task;
                }
                else{
                    return task.status === (filter.status === 1 ? true : false);
                }
            });
        }
        if(sortBy === 'name'){
            tasks.sort(function(a,b){
                if(a.name > b.name) return sortValue;
                else if(a.name<b.name) return -sortValue;
                else return 0;
            })
        }
        else{
            tasks.sort((a,b) =>{
                var x1 = (a.status===true) ? 1 : 0;
                var x2 = (b.status===true) ? 1 : 0;
                if(x1<x2) return sortValue;
                else if(x1>x2) return -sortValue;
                else return 0;
            })
        }
        if(keyword){
            tasks = tasks.filter(function(task){
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) >-1;
            });
        }
        var elmTaskForm = isDisplayForm ? <TaskForm 
            onSubmit = {this.onSubmit}
            onCloseForm = {this.onCloseForm}
            task={taskEditing}/> : '';
        return (
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
            
            </div>
            <div class="row">
                <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
                    {elmTaskForm}
                </div>
                <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                     : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                    <button 
                        onClick = {this.onToggleForm}
                        type="button" className="btn btn-primary">
                        <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                    </button>&nbsp;
                <br/>
                <br/>               
                    <Control
                        onSort = {this.onSort}
                        onSearch = {this.onSearch}/>
                    <br/>
                    <div class="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <TaskList tasks={tasks} 
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteItem = {this.onDeleteItem}
                            onUpdate = {this.onUpdate}
                            onFilter = {this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );    
  }
}

export default App;
