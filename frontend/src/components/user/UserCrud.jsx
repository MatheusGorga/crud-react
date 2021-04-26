import React, {Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'


const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle:'Crie e Gerencie Usuários'
}


const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []
}


export default class UserCrud extends Component{

    state = {...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => 
            this.setState({list: resp.data}))
    }

    clear() {
        this.setState({user: initialState.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}`: baseUrl

        axios[method](url,user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list})
            })
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updatedFild(event){
        const user = { ...this.state.user}
        user[event.target.name] = event.target.value 
        this.setState({user})
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="Nome">Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updatedFild(e)} placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updatedFild(e)} placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn "
                           onClick={e => this.save(e)} >
                            <i class="fa fa-plus text-success "></i> 
                        </button>

                        
                        <button className="btn ml-2" onClick={e => this.clear(e)} >
                            <i class="fa fa-times text-danger "> </i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    renderTable(){
        return this.state.list.map(user => {
            return (
                <div className="contente container-fluid card p-3 mt-3" key={user.id} >
                <div className="container-fluid p-2">
                    <h2 className="text-info col-12" >{user.name}</h2>
                    <div className="d-flex">
                        <div className="flex-grow-1" >
                            <span className="col " > Usuario: {user.name} </span>
                            <span className="col"> E-mail: {user.email} </span>
                        </div>
                        <div className="" >
                                <button className="btn btn-info " onClick={ () => this.load(user)} >
                                    <i className="fa fa-edit" ></i>
                                </button>
                                <button className="btn btn-danger ml-2" onClick={ () => this.remove(user)} >
                                    <i className="fa fa-trash" ></i>
                                </button>

                        </div>
                    </div>
                </div>
                
                </div>
            )
        } )
             
        
    }

    // renderTable(){
    //     return(
    //         <table className="table mt-4">
    //             <thead>
    //                 <tr>
    //                     <th>ID</th>
    //                     <th>Nome</th>
    //                     <th>Email</th>
    //                     <th>Ações</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {this.renderRows()}
    //             </tbody>
    //         </table>
    //     )
    // }

    // renderRows(){
    //     return this.state.list.map(user => {
    //         return(
    //             <tr key={user.id}>
    //                 <td>{user.id}</td>
    //                 <td>{user.name}</td>
    //                 <td>{user.email}</td>
    //                 <td>
    //                     <button className="btn btn-info" onClick={ () => this.load(user)} >
    //                         <i className="fa fa-edit" ></i>
    //                     </button>
    //                     <button className="btn btn-danger ml-2" onClick={ () => this.remove(user)} >
    //                         <i className="fa fa-trash" ></i>
    //                     </button>
    //                 </td>
    //             </tr>
    //         )
    //     })
    // }

    load(user){
        this.setState({user})
    }

     remove(user){
             axios.delete(`${baseUrl}/${user.id}`).then(resp => {
             const list = this.getUpdatedList(user, false )
             this.setState({ list})
        })
    }

    render(){
        
        return (
            
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}