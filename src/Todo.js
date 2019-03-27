import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props) {
      super(props)
    
      this.onSubmitChange = this.onSubmitChange.bind(this);

      this.state = {
         edit: false,
         mockData:[{
             title: 'New Demo',
             id: new Date()
         }]
      }
    }

    onSubmitChange(event){
        event.preventDefault();
        this.setState({
            mockData:[...this.state.mockData,{
                title: event.target.task.value,
                id: new Date()
            }]
        });
        event.target.task.value = '';
    }

    removeTask(){
        let id= arguments[0];
        this.setState({
            mockData: this.state.mockData.filter( task => {
                if(task.id !== id)
                    return task
            })
        })
    }
    
    onUpdateHandle(event){
        event.preventDefault();
        this.setState({
            mockData: this.state.mockData.map(task => {
                if (task.id === this.state.id) {
                    task['title'] = event.target.updatedItem.value;
                    return task;
                }
                return task;
            })
         });
         this.setState({
            edit: false
         });
    }

    editTask(event){
        this.setState({
            edit:true,
            id:arguments[0],
            title: arguments[1]
        });
    }

    renderEditForm(){
        if(this.state.edit){
            return  <form onSubmit={this.onUpdateHandle.bind(this)}>
                        <input type="text" name="updatedItem" defaultValue={this.state.title} />
                        <button>Update</button>
                    </form>
        }   
    }
    
  render() {
    return (
      <div>
          {this.renderEditForm()}
        <form onSubmit={this.onSubmitChange}>
            <input type="text" name="task" required />
            <button>add</button>
        </form>
        <ul>
            {this.state.mockData.map(task=>(
                <li key={task.id}>
                    {task.title}
                    <button onClick={this.editTask.bind(this, task.id, task.title)}>edit</button>
                    <button onClick={this.removeTask.bind(this, task.id)}>x</button>
                </li>
            ))}
        </ul>
      </div>
    )
  }
}
