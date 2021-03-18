import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import {  useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function Summary() {

  const {transactions} = useTransactions();


  const summary = transactions.reduce((acumulador, transaction) => {
    if(transaction.type === 'deposit') {
      acumulador.deposits += transaction.amount;
      acumulador.total += transaction.amount;
    } else {
      acumulador.withdraws += transaction.amount
      acumulador.total -= transaction.amount;
    
    }
    return acumulador;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Icone Entradas"/>
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.deposits)}
          
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Icone Saídas"/>
        </header>
        <strong>
          - {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
             currency: 'BRL'
            }).format(summary.withdraws)}
        </strong>
      </div>

      <div className="highlight-total">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Icone Total"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}</strong>
      </div>
    </Container>
  )
}