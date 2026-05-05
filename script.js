
//Enregistrer l'event
let expenseForm = document.querySelector("#expense-form");

let transactionsList = document.querySelector("#transactions-list");

const expenseContainer = document.querySelector(".expense");
const expenseMean = document.querySelector(".expense-mean");

let transactions = [];

function saveToLocalStorage(){
    localStorage.setItem("Trans", JSON.stringify(transactions));
};

function updateExpense(){
    let total_expense = transactions.reduce(  (sum, currentValue)=> sum + currentValue.expenseAmount ,0   );

    let mean_expense = transactions.length >0 ? total_expense/transactions.length : 0;

    expenseContainer.textContent = total_expense;
    expenseMean.textContent = `Mean of expenses : ${mean_expense}` ;

};

function displayTransactionExpense(expense){
    let expenseToDisplay = document.createElement("li");
    expenseToDisplay.classList.add("expense-js");
    expenseToDisplay.dataset.id = expense.id;

    const deleteToDispay = document.createElement("button");
    deleteToDispay.textContent = "🗑";
    deleteToDispay.classList.add("expense-delete-js");

    let expenseNameToDisplay = document.createElement("div");
    expenseNameToDisplay.textContent = `${expense.expenseName}`;
    expenseNameToDisplay.classList.add("expense-name-js");

    let expenseAmountToDisplay = document.createElement("div");
    expenseAmountToDisplay.textContent = `${expense.expenseAmount}`;
    expenseAmountToDisplay.classList.add("expense-amount-js");

    let expenseDateToDisplay = document.createElement("div");
    expenseDateToDisplay.textContent = `${expense.expenseDate}`;
    expenseDateToDisplay.classList.add("expense-date-js");

    let expenseCategoryToDisplay = document.createElement("div");
    expenseCategoryToDisplay.textContent = `${expense.expenseCategory}`;
    expenseCategoryToDisplay.classList.add("expense-category-js");

    expenseToDisplay.appendChild(expenseNameToDisplay );
    expenseToDisplay.appendChild(expenseAmountToDisplay);
    expenseToDisplay.appendChild(expenseDateToDisplay);
    expenseToDisplay.appendChild(expenseCategoryToDisplay);
    expenseToDisplay.appendChild(deleteToDispay);

    transactionsList.appendChild(expenseToDisplay);


    deleteToDispay.addEventListener("click", ()=> {expenseToDisplay.remove();

    transactions.splice( transactions.findIndex(transaction => transaction.id === expense.id)      ,1);
    saveToLocalStorage();
    updateExpense();
});

};



/*function updateMeanExpense(){
    let total_expense = transactions.reduce(  (sum, currentValue)=> sum + currentValue.expenseAmount ,0         );
    return total_expense;
}*/

document.addEventListener("DOMContentLoaded", ()=>{
    let currentTrans = localStorage.getItem("Trans");
    if (currentTrans !== null){
        transactions = JSON.parse(currentTrans);
    }else{
    transactions = [];
    };
    transactions.forEach((transaction)=> displayTransactionExpense(transaction));
    updateExpense();


});



expenseForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    let expenseNameValue = document.querySelector("#expense-name").value;
    let expenseAmountValue = document.querySelector("#expense-amount").value;
    let expenseDateValue = document.querySelector("#expense-date").value;
    let expenseCategoryValue = document.querySelector("#category-id").value;

    let expense = { expenseName:expenseNameValue,
        expenseAmount:+expenseAmountValue,
        expenseDate:expenseDateValue,
        expenseCategory:expenseCategoryValue,
        id: Date.now()
}


transactions.push(expense);
displayTransactionExpense(expense);
expenseForm.reset();
saveToLocalStorage();
updateExpense();

console.log(transactions);

});
