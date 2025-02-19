import React, { useState } from 'react';
import './App.css';

import cor1 from './cor1.png';  
import cor2 from './cor2.png';
import cor3 from './cor3.png';
import cor4 from './cor4.png';
import cor5 from './cor5.png';
import cor6 from './cor6.png';

const ConfirmacaoPresenca = () => {
  const [nomePinguim, setNomePinguim] = useState('');
  const [email, setEmail] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [imagemLado, setImagemLado] = useState(cor1); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nomePinguim && email && confirmacao) {
      try {
        const response = await fetch('https://clubpenguin.onrender.com/enviar-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomePinguim, email, confirmacao }),
        });

        if (response.ok) {
          setMensagem(`Ebaa Pinguim ${nomePinguim} ativado com sucesso! E-mail enviado para ${email}.`);
        } else {
          setMensagem('Erro ao enviar o e-mail. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        setMensagem('Erro ao enviar o e-mail. Tente novamente.');
      }
    } else {
      setMensagem('Por favor, preencha todos os campos.');
    }
  };

  const mudarCorPersonagem = (cor) => {
    switch (cor) {
      case 'cor1':
        setImagemLado(cor1);
        break;
      case 'cor2':
        setImagemLado(cor2);
        break;
      case 'cor3':
        setImagemLado(cor3);
        break;
      case 'cor4':
        setImagemLado(cor4);
        break;
      case 'cor5':
        setImagemLado(cor5);
        break;
      case 'cor6':
        setImagemLado(cor6);
        break;
      default:
        setImagemLado(cor1);
    }
  };

  return (
    <div className="fundobranco">
      <div className="conteudo">
        <div className="imagem-lado">
          <img src={imagemLado} alt="Imagem do Personagem" />
        </div>
        <div className="formulario-lado">
          <h1 className="titulo">Confirmação de Presença</h1>
          <label className="aviso">
            Atenção: Por favor não convide outras pessoas sem minha permissão!
          </label>
          <form onSubmit={handleSubmit}>
            <div className="campo-formulario">
              <label className="jogo">Nome do Pinguim:</label>
              <input
                type="text"
                value={nomePinguim}
                onChange={(e) => setNomePinguim(e.target.value)}
              />
            </div>
            <div className="campo-formulario">
              <label className="jogo">E-mail:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p>Selecione uma cor: </p>
            <div className="cores">
              <button
                className="cor1"
                type="button"
                onClick={() => mudarCorPersonagem('cor1')}
              ></button>
              <button
                className="cor2"
                type="button"
                onClick={() => mudarCorPersonagem('cor2')}
              ></button>
              <button
                className="cor3"
                type="button"
                onClick={() => mudarCorPersonagem('cor3')}
              ></button>
              <button
                className="cor4"
                type="button"
                onClick={() => mudarCorPersonagem('cor4')}
              ></button>
              <button
                className="cor5"
                type="button"
                onClick={() => mudarCorPersonagem('cor5')}
              ></button>
              <button
                className="cor6"
                type="button"
                onClick={() => mudarCorPersonagem('cor6')}
              ></button>
            </div>

            <div className="campo-formulario">
              <label className="jogo">Confirmar Presença:</label>
              <div className="radio-group">
                <label className="jogo">
                  <input
                    type="radio"
                    name="confirmacao"
                    value="Sim"
                    onChange={(e) => setConfirmacao(e.target.value)}
                  />{" "}
                  Sim
                </label>
                <label className="jogo">
                  <input
                    type="radio"
                    name="confirmacao"
                    value="Não"
                    onChange={(e) => setConfirmacao(e.target.value)}
                  />{" "}
                  Não
                </label>
              </div>
            </div>
            <button type="submit">Enviar</button>
          </form>
          {mensagem && <p>{mensagem}</p>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoPresenca;
