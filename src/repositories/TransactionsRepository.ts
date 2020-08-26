import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length > 0) {
      const income = this.transactions
        .map(transaction =>
          transaction.type === 'income' ? transaction.value : 0,
        )
        .reduce((total, amount) => total + amount);

      const outcome = this.transactions
        .map(transaction =>
          transaction.type === 'outcome' ? transaction.value : 0,
        )
        .reduce((total, amount) => total + amount);

      const total = income - outcome;

      const balance = {
        income,
        outcome,
        total,
      };

      return balance;
    }

    return { income: 0, outcome: 0, total: 0 };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
