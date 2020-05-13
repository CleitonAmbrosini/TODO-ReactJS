import React, { Component } from 'react'
import axios from 'axios'

// components
import PageHeader from '../tamplete/pageHeader'
import TodoForm from './todoForm'
import TodoLista from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{
  constructor(props){
    super(props)

    this.state = {
      description: '',
      list: []
    }

    this.refresh()


    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  refresh(description = ''){
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(resp => {
        this.setState({...this.state, description, list: resp.data})
      })
  }

  handleChange(e){
    this.setState({...this.state, description:e.target.value})
  }

  handleAdd() {
    const description = this.state.description
    axios.post(URL, {description})
      .then(resp => {
        this.refresh()
      })
  }

  handleRemove(todo){
    axios.delete(`${URL}/${todo._id}`)
      .then(res => {
        this.refresh(this.state.description)
      })
  }

  handleMarkAsDone(todo){
    axios.put(`${URL}/${todo._id}`, {...todo, done: true})
      .then(res => {
        this.refresh(this.state.description)
      })
  }

  handleMarkAsPending(todo){
    axios.put(`${URL}/${todo._id}`, {...todo, done: false})
      .then(res => {
        this.refresh(this.state.description)
      })
  }

  handleSearch(){
    this.refresh(this.state.description)
  }

  handleClear(){
    this.refresh()
  }

  render(){
    return(
      <div>
        <PageHeader name="Tarefas" small="Cadastro"/>
        <TodoForm handleAdd={this.handleAdd} handleChange={this.handleChange} description={this.state.description} handleSearch={this.handleSearch} handleClear={this.handleClear}/>
        <TodoLista list={this.state.list} handleRemove={this.handleRemove} handleMarkAsDone={this.handleMarkAsDone} handleMarkAsPending={this.handleMarkAsPending}/>
      </div>
    )
  }
}