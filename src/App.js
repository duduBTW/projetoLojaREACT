import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Produtos from './Produtos'
import Fundos from './Fundos'
import uuid from 'uuid'
import Login from './componentes/Login';
import BarraNav from './componentes/BarraNav'
import CriarConta from './componentes/CriarConta';
import axios from 'axios';

class App extends Component {
  state = {
    logado: false,
    esseUsuario: null,
    dinheiro: 720.00,
    itens: [
      {item: 'Celular', preco: 600.00, id:uuid.v4()},
      {item: 'Pen drive', preco: 20.00, id:uuid.v4()},
      {item: 'Computador', preco: 2600.00, id:uuid.v4()}
    ],
    usuarios: [
      
    ],
    intervalIsSet: false,
    data: []
  }

  comprar = (produto) => {
    if (this.state.logado === true) {
      let novoDinheiro = null
      const id = this.state.esseUsuario.id
      const tipo = this.state.esseUsuario.tipo
      if ((this.state.esseUsuario.dinheiro - produto.preco) >= 0){
        novoDinheiro = this.state.esseUsuario.dinheiro - produto.preco
        this.setState({
          esseUsuario: {
            dinheiro: novoDinheiro,
            id: id,
            tipo
          }
        })
      } else {
        alert('Sem fundos suficientes para realizar essa compra')
        novoDinheiro = this.state.esseUsuario.dinheiro
      }
    }else{
      alert('Você precisa estar logado para realizar uma compra')
    }
  }

  addMoney = (novoDinheiro) => {
    const dinheiro = Number(this.state.dinheiro) + Number(novoDinheiro)
    this.setState({
      dinheiro
    })
    alert(`R$ ${novoDinheiro} adicionados a sua conta`)
  }
  novaConta = (user) => {
    user.id = uuid.v4()
    user.dinheiro = 0
    const novoUser = [...this.state.usuarios, user]
    this.setState({
      usuarios: novoUser
    })
  }
  Entrar = (user) => {
    let test = false
    this.state.usuarios.map(usuario => {
      if ((user.usuario === usuario.usuario) && (user.senha === usuario.senha)){
        test = true
        return(
          this.setState({
            logado: true,
            esseUsuario: usuario
          })
        )
      }else {
        return null
      }
    })
    if(test === false){
      return alert('Usuario ou senha incorreto')
    }
  }
  colocarDinheiro = (novoDinheiro) => {
    const dinheiro = Number(this.state.esseUsuario.dinheiro) + Number(novoDinheiro)
    const id = this.state.esseUsuario.id
    const tipo = this.state.esseUsuario.tipo
    this.setState({
      esseUsuario: {
        dinheiro,
        id,
        tipo
      }
    })
  }
  sair = () =>{
    this.state.usuarios.map(usuario => {
      if(usuario.id === this.state.esseUsuario.id){
        return usuario.dinheiro = this.state.esseUsuario.dinheiro
      } else {
        return null
      }
    })
    this.setState({
      logado: false
    })
  }
  colocarProduto = (novoProduto) => {
    novoProduto.id = uuid.v4()
    const itens = [...this.state.itens, novoProduto]
    this.setState({
      itens
    })
  }
  removerProduto = (id) => {
    const itens = this.state.itens.filter(produto => produto.id !== id)
    this.setState({
      itens
    })
  }
  render() {
    return (
      <BrowserRouter>
      <BarraNav logado={this.state.logado}  />
        <div className="todo-app container">
          <Fundos dinheiro={this.state.logado === true ? this.state.esseUsuario.dinheiro: null} />
          <div className="teste">
            <Route exact path="/" render={(props) => <Produtos colocarProduto={this.colocarProduto} removerProduto={this.removerProduto}
            esseUsuario={this.state.logado === true ? this.state.esseUsuario : null} comprar={this.comprar} itens={this.state.itens}/>} />
            <Route path="/criar-conta" render={(props) => <CriarConta novaConta={this.novaConta} logado={this.state.logado} />} />
            <Route path="/entrar" render={(props) => 
            <Login sair={this.sair} colocarDinheiro={this.colocarDinheiro} esseUsuario={this.state.esseUsuario} Entrar={this.Entrar} logado={this.state.logado} />} />
          </div>
        </div>
      </BrowserRouter>
      
    );
  }
}
export default App;