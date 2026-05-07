
//Enregistrer l'event
let expenseForm = document.querySelector("#expense-form");

let transactionsList = document.querySelector("#transactions-list");

const expenseContainer = document.querySelector(".expense");
const expenseMean = document.querySelector(".expense-mean");
const expenseBalance = document.querySelector(".balance");
const expenseJauge = document.querySelector(".jauge-fill");
const transactionTotal = document.querySelector(".transaction-total");
const deleteAll = document.querySelector(".delete-all");
const CategoryClass =  document.querySelectorAll(".category-class");
const CurrentMonth = document.querySelector("nav li:first-child");
//const tweaks = document.querySelector("nav li:second-child");
//const AboutUs = document.querySelector("nav li:third-child");


let transactions = [];

function saveToLocalStorage(){
    localStorage.setItem("Trans", JSON.stringify(transactions));
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

const budgetContainer = document.querySelector(".budget");
const budgetbutton = document.querySelector(".before-jauge button");
let budgetvar = 0;
let Budgets = "";
function editBudget(){


    let inputval = document.createElement("input");
    inputval.setAttribute('type', "number"     );
    inputval.setAttribute('value', budgetContainer.innerText );

    budgetContainer.replaceWith(inputval);

    Budgets = budgetvar;
    inputval.addEventListener('keydown', (e)=> {
        if (e.key === "Enter"){
            budgetContainer.textContent = inputval.value;
            inputval.replaceWith(budgetContainer);
            budgetvar = +inputval.value;

            localStorage.setItem("Budget", JSON.stringify(budgetvar));

            updateExpense();
        }
    })

};

function updateExpense(){
    let total_expense = transactions.reduce(  (sum, currentValue)=> sum + currentValue.expenseAmount ,0   );

    let mean_expense = transactions.length >0 ? total_expense/transactions.length : 0;

    let pourcentage = +Budgets>0 ? Math.min ( (total_expense / +Budgets)*100, 100 ): 0 ;
    expenseJauge.style.width = `${pourcentage}%`;
    console.log(pourcentage);

    let solde = +Budgets - total_expense;
    expenseBalance.textContent = solde;
    expenseBalance.style.color = solde < 0 ? "red" : "var(--color-text-main)";

    expenseContainer.textContent = total_expense;
    transactionTotal.textContent = transactions.length;

    expenseMean.textContent = `Mean of expenses : ${mean_expense}` ;


    CategoryClass.forEach(
    category =>  {
        const CategoryName = category.dataset.category;
        const CategoryTotal = category.querySelector(".category-total");

        if (CategoryName === "all"){
            CategoryTotal.textContent = transactions.length;
        }else{
            CategoryTotal.textContent = transactions.filter((transaction)=>transaction.expenseCategory === CategoryName
        ).length;
        }
    }) ;


};

budgetbutton.addEventListener("click",
    ()=>{editBudget()}
);

function filterTransactions(category){
    transactionsList.innerHTML = "";
    transactions.filter( transaction => transaction.expenseCategory === category).forEach(transaction =>
        displayTransactionExpense(transaction));

};

function closeModaleFunc(){
    overlay.style.display = "none";
    modale.style.display = "none";
}


CategoryClass.forEach(
    category => category.addEventListener("click", ()=> {
        // Retirer active de tous les filtres
        CategoryClass.forEach(cat => cat.classList.remove("active"));
        // Ajouter active sur celui cliqué
        category.classList.add("active");

        if (category.dataset.category === "all"){
            transactionsList.innerHTML = "";
            transactions.forEach(transaction => displayTransactionExpense(transaction));
        }else{
            filterTransactions(category.dataset.category)
        }
    }


         ) );

deleteAll.addEventListener("click", ()=> {
    transactions = [];
    transactionsList.innerHTML = "";
    saveToLocalStorage();
    updateExpense();


});

CurrentMonthvar ="";
document.addEventListener("DOMContentLoaded", ()=>{
    closeModaleFunc();

    let modeValue = localStorage.getItem("mode");
    if (modeValue === "true"){

        document.body.classList.add("dark");
        darkMode.checked = true;

    }else{

    };


    let moisActuel = `${new Date().toLocaleString('en-US', {month: 'long'})} ${new Date().getFullYear()}`;
    let moisSauvegarde = localStorage.getItem("moisSauvegarde");
    if (moisActuel !== moisSauvegarde){
        transactions = [];

        localStorage.removeItem("Budget");
        localStorage.removeItem("Trans");

        localStorage.setItem("moisSauvegarde", moisActuel);

        moisSauvegarde = moisActuel
    }
    else{

    }
    CurrentMonth.textContent = moisSauvegarde;


    let currentTrans = localStorage.getItem("Trans");
    if (currentTrans !== null){
        transactions = JSON.parse(currentTrans);
    }else{
    transactions = [];
    };
    transactions.forEach((transaction)=> displayTransactionExpense(transaction));


    let currentBudg = localStorage.getItem("Budget");
    if (currentBudg != null){
        Budgets = JSON.parse(currentBudg);
    }else{
        Budgets = "";
    }

    budgetContainer.textContent = Budgets;

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

const tweaks = document.querySelector("nav li:nth-child(2)");
const overlay = document.querySelector(".overlay");
const modale = document.querySelector(".modale");
tweaks.addEventListener("click", ()=>{
    overlay.style.display = "block";
    modale.style.display = "flex";

})

const closeModale = document.querySelector(".close-modale");
closeModale.addEventListener("click", ()=>{
    closeModaleFunc();
})

overlay.addEventListener("click", ()=>{
    closeModaleFunc();
})

const darkMode = document.querySelector("#dark-mode-toggle");

darkMode.addEventListener("change", ()=>{
        document.body.classList.toggle("dark");
        localStorage.setItem("mode", darkMode.checked);
    }
)
