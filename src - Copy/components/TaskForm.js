import React, { Component } from 'react';

class TaskForm extends Component {
 
  constructor(props){
      super(props);
      this.state = {
          id:'',
          name : '',
          status : false
      }
  }
  componentWillMount(){
      if(this.props.task){
          var {task} = this.props;
          this.setState({
              id : task.id,
              name : task.name,
              status: task.status
          });
      }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
        console.log('nextprops' + nextProps);
        this.setState({
            id : nextProps.task.id,
            name : nextProps.task.name,
            status:nextProps.task.status
        });
    }
    else{
        this.setState({
            id:'',
            name : '',
            status : false
        });
    }
  }
  onCloseForm = () =>{
      this.props.onCloseForm();
  }
  onChange = (event) =>{
      var target = event.target;
      var name= target.name;
      var value = target.value;
      if(name==='status'){
          value = target.value === 'true' ? true : false;
      }
      this.setState({
          [name] :value
      });
  }
  onSubmit = (event) =>{
        event.preventDefault();
        // this.setState({
        //     name:'',
        //     status:false
        // });
        console.log(this.state);
        this.props.onSubmit(this.state);
  }
  onClear = () => {
    this.setState({
        name:'',
        status:false
    });
  }
  render(){
    var {id} = this.state;
    return (
        <div class="card ">
            <div class="card-header bg-warning">
                <h3 class="card-title">{id ? "Sửa công việc" : "thêm công việc"}
                <span class="fa fa-times-circle text-right ml-70 d-inline-block"
                      onClick = {this.onCloseForm}
                ></span>
                </h3>
            </div>
            <div class="card-body">
                <form onSubmit = {this.onSubmit}>
                    <div class="form-group">
                        <label>Tên :</label>
                        <input type="text"
                               class="form-control"
                               name = "name"
                               required="required"
                               value ={this.state.name}
                               onChange = {this.onChange}
                               />
                    </div>
                    <label>Trạng Thái :</label>
                    <select class="form-control"
                            name = "status"
                            value ={this.state.status}
                            onChange = {this.onChange}
                            required="required">
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div class="text-center">
                        <button type="submit" class="btn btn-warning">
                        {id ? 'Sửa' : 'Thêm'}
                        </button>&nbsp;
                        <button 
                        onClick = {this.onClear}
                        type="submit" class="btn btn-danger">Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    );    
  }

}

export default TaskForm;
