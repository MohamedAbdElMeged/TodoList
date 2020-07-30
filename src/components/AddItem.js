import React, { Component } from 'react'

export class AddItem extends Component {
    state = {
        title: ''
    }
    changeTitle = (e) => this.setState({ [e.target.name]: e.target.value});
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.title);
        this.setState({title: ''});
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input type="text" name="title"
                 placeholder="add todo item" style={{flex:'10' , padding: '5px'}}
                  value={this.state.title} onChange={this.changeTitle}/>
                <input type="submit" value="Submit" className="btn" style={{flex: '1'}} />   
            </form>
        )
    }
}

export default AddItem
