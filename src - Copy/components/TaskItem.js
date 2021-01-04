import React, { Component } from 'react';
class TaskItem extends Component {
    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteItem = () =>{
        console.log('click');
        this.props.onDeleteItem(this.props.task.id);
    }
    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id);
    }
  render(){
      var { task , index } = this.props;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td class="text-center">
                <span class={task.status === true ? "badge badge-success" : "badge badge-danger"}
                onClick = {this.onUpdateStatus}>
                {task.status === true ? "Kích Hoạt" : "Ẩn"}
                </span>
            </td>
            <td class="text-center">
                <button type="button" class="btn btn-warning" onClick = {this.onUpdate}>
                    <span class="fa fa-pencil mr-5"></span>Sửa
                </button>
                &nbsp;
                <button type="button" class="btn btn-danger"  onClick = {this.onDeleteItem}>
                    <span class="fa fa-trash mr-5"
                      
                    ></span>Xóa
                </button>
            </td>
        </tr>
    );    
  }

}

export default TaskItem;
