import React, { Component } from 'react';

class Sort extends Component {

  constructor(props){
      super(props);
      this.state={
          sort:{
              by : 'name',
              value : 1
          }
      }
  }
  onClick = (sortBy,sortValue)=>{
      this.setState({
          sort:{
              by :sortBy,
              value:sortValue
          }
      });
      this.props.onSort(sortBy,sortValue);  
  }  
  render(){
      var {sort} = this.state;
    return (
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp     
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick = {()=>this.onClick('name',1)}>
                        <a role="button" className={(sort.by==='name'&&sort.value===1) ? "dropdown-item sort-selected" : "dropdown-item "}>
                                    <span className="fa fa-sort-alpha-asc pr-5">
                                        Tên A-Z
                                    </span>
                                </a>
                    </li>
                    <li onClick = {()=>this.onClick('name',-1)}>
                        <a role="button" className={(sort.by==='name'&&sort.value===-1) ? "dropdown-item sort-selected" : "dropdown-item "}>
                                    <span class="fa fa-sort-alpha-desc pr-5">
                                        Tên Z-A
                                    </span>
                                </a>
                    </li>
                    <li role="separator" class="dropdown-divider"></li>
                    <li onClick = {()=>this.onClick('status',1)}>
                        <a role="button"className={(sort.by==='status'&&sort.value===1) ? "dropdown-item sort-selected" : "dropdown-item "}>Trạng Thái Kích Hoạt</a>
                    </li>
                    <li onClick = {()=>this.onClick('status',-1)}>
                        <a role="button"className={(sort.by==='status'&&sort.value===-1) ? "dropdown-item sort-selected" : "dropdown-item "}>Trạng Thái Ẩn</a>
                        </li>
                </ul>
            </div>
        </div>     
    );    
  }

}

export default Sort;
