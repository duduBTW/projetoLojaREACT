import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Login extends Component {
    state = {
        user: {
            usuario: '',
            senha: '',
        },
        adcDinheiro: null,
        adicionar: false
    }
    aoEnviar = (e) => {
        e.preventDefault()
        this.props.Entrar(this.state)
    }
    aoMudar = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    adicionarDinheiro = () => {
        this.setState({
            adicionar: !this.state.adicionar
        })
    }
    adicionarValor = (e) => {
        e.preventDefault()
        this.props.colocarDinheiro(this.state.adcDinheiro)
        this.setState({
            adicionar: !this.state.adicionar
        })
    }
    mudarDinheiro = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
        const {logado, esseUsuario} = this.props
        return(
            <div className="conteiner-login">
                { logado === false ? <form onSubmit={this.aoEnviar}>
                    <h3 className="center">Entrar</h3>
                        <input type="text" name="usuario" id="usuario" placeholder="Login..." onChange={this.aoMudar}/>
                        <input type="password" name="senha" id="senha" placeholder="Senha..." onChange={this.aoMudar}/>
                        <div className="center botoes">
                            <button className="btn center" type="submit">Entrar</button>
                            <Link className="btn voltar" to="/criar-conta">Criar Conta</Link>
                        </div>
                </form> : 
                <div className="center">
                    <h2>R$: {esseUsuario.dinheiro}</h2>
                    <button type="button" onClick={this.adicionarDinheiro} className='btn'>Adicionar</button>
                    {this.state.adicionar === true ?
                     <form onSubmit={this.adicionarValor}>
                        <input id="adcDinheiro" onChange={this.mudarDinheiro} type="number"/>
                        <button className="btn btn-adicionar" type="submit">Enviar</button>
                     </form>
                     : null}
                     <button onClick={this.props.sair} type="button" className='btn'>Sair</button>
                </div>
                 }
            </div>
        )
    }
}

export default Login