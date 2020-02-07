import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({history}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmitLogin(event) {
        event.preventDefault();
        let response = await api.post('/auth/authenticate', {
            email,
            password: senha
        });
        const {_id, aluno} = response.data.user
        localStorage.setItem('user_id', _id);
        if (aluno === true)
            history.push('/aluno');
        else
            history.push('/professor');
    }

    return (
        <div className="container">
            <div className="content">        
                <p>Acesse o Boletim Online</p>
                <form>
                    <label htmlFor="email">E-MAIL</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email do Aluno"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={event => setSenha(event.target.value)}
                    />
                    <button className="btn" onClick={handleSubmitLogin}>Entrar</button>
                </form>
            </div>
        </div>           
    );
}

