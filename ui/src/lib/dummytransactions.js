const transactions = [];

function addTransactions(obj){
    transactions.push(obj);
}
function getTransactions(){
    return(transactions)
}
const transactionMethods = { addTransactions, getTransactions };
module.export = transactionMethods