
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

const translations = {
    fr:{
        APropos: "À propos",
        budgetMois: "BUDGET DU MOIS",
        editMois: "Editer",
        depenseMois:"DÉPENSÉ CE MOIS",
        moyDepense:"Moyenne des dépenses:",
        solde: "SOLDE",

        ajoutDepense:"Ajouter une dépense",
        description: "Description",
        montant: "Montant",
        category: "Catégorie",
        boutonAjout: "+ Ajouter",

        transaction:"Transactions",
        tout: "Tout",
        nourriture: "Nourriture",
        transport: "Transport",
        logement: "Logement",
        sante: "Santé",
        sub:"Abonnements",
        shopping:"Shopping",
        rest:"Restaurants",
        voyage:"Voyages",
        hobby:"Hobbies",
        autres: "Autres",
        touSupprimer:"Tout supprimer",

        titre:"Mon tracker de dépenses",

        darkModetransl:"Mode sombre",
        mode: "Mode:",
        langue:"Langue:",
        devise:"Devise:"
    },

    en:{
        APropos: "About us",
        budgetMois: "MONTH BUDGET",
        editMois: "Edit",
        depenseMois:"SPENT THIS MONTH",
        moyDepense:"Mean of expenses",
        solde: "BALANCE",

        ajoutDepense:"Add an expense",
        description: "Description",
        montant: "Amount",
        category: "Category",
        boutonAjout: "+ Add",

        transaction:"Transactions",
        tout: "All",
        nourriture: "Food",
        transport: "Transport",
        logement: "Housing",
        sante: "Health",
        sub:"Subscriptions",
        shopping:"Shopping",
        rest:"Restaurants",
        voyage:"Trips",
        hobby:"Hobbies",
        autres: "Others",
        touSupprimer:"Delete all",

        titre:"My Expense Tracker",

        darkModetransl:"Dark Mode",
        mode: "Mode:",
        langue:"Language:",
        devise:"Currency:"
    }
};

const currencies = {
    eur:{
        val:"€"
    },
    usd:{
        val:"$"
    }
};


let transactions = [];

function saveToLocalStorage(){
    localStorage.setItem("Trans", JSON.stringify(transactions));
};

function setLanguage(lang){
    const traduction = translations[lang];

    document.querySelector("h1").textContent = traduction.titre;
    document.querySelector("nav li:nth-child(3)").textContent = traduction.APropos;
    document.querySelector(".budget-left h3").textContent = traduction.budgetMois;
    document.querySelector(".before-jauge button").textContent = traduction.editMois;
    document.querySelector(".expense-container h3").textContent = traduction.depenseMois;
    //document.querySelector(".expense-mean").textContent = traduction.moyDepense;
    document.querySelector(".balance-container h3").textContent = traduction.solde;
    document.querySelector(".add-expense h2").textContent = traduction.ajoutDepense;
    document.querySelector("#expense-name").placeholder = traduction.description;
    document.querySelector("#expense-amount").placeholder = traduction.montant;
    document.querySelector("#category-id option[value=''] ").textContent = traduction.category;
    document.querySelector("#category-id option[value='food']").textContent = traduction.nourriture;
    document.querySelector("#category-id option[value='transport']").textContent = traduction.transport;
    document.querySelector("#category-id option[value='housing']").textContent = traduction.logement;
    document.querySelector("#category-id option[value='health']").textContent = traduction.sante;
    document.querySelector("#category-id option[value='sub']").textContent = traduction.sub;
    document.querySelector("#category-id option[value='shopping']").textContent = traduction.shopping;
    document.querySelector("#category-id option[value='rest']").textContent = traduction.rest;
    document.querySelector("#category-id option[value='trips']").textContent = traduction.voyage;
    document.querySelector("#category-id option[value='hobbies']").textContent = traduction.hobby;
    document.querySelector("#category-id option[value='others']").textContent = traduction.autres;
    document.querySelector(".add-button").textContent = traduction.boutonAjout;
    document.querySelector(".transactions-header h2").textContent = traduction.transaction;
    document.querySelector(".delete-all").textContent = traduction.touSupprimer;
    document.querySelector(".category-class:first-child .category-text").textContent = traduction.tout;
    document.querySelector(".category-class:nth-child(2) .category-text").textContent = traduction.nourriture;
    document.querySelector(".category-class:nth-child(3) .category-text").textContent = traduction.transport;
    document.querySelector(".category-class:nth-child(4) .category-text").textContent = traduction.logement;
    document.querySelector(".category-class:nth-child(5) .category-text").textContent = traduction.sante;
    document.querySelector(".category-class:nth-child(6) .category-text").textContent = traduction.sub;
    document.querySelector(".category-class:nth-child(7) .category-text").textContent = traduction.shopping;
    document.querySelector(".category-class:nth-child(8) .category-text").textContent = traduction.rest;
    document.querySelector(".category-class:nth-child(9) .category-text").textContent = traduction.voyage;
    document.querySelector(".category-class:nth-child(10) .category-text").textContent = traduction.hobby
    document.querySelector(".category-class:nth-child(11) .category-text").textContent = traduction.autres;
    document.querySelector(".mode label").textContent = traduction.darkModetransl;
    document.querySelector(".mode p").textContent = traduction.mode;
    document.querySelector(".language p").textContent = traduction.langue;
    document.querySelector(".devise p").textContent = traduction.devise;

    if (lang === "fr"){
        moisActuel = `${new Date().toLocaleString('fr-FR', {month: 'long'}).charAt(0).toUpperCase() +
        new Date().toLocaleString('fr-FR', {month: 'long'}).slice(1)} ${new Date().getFullYear()}`;
    }
    else if(lang === "en"){
        moisActuel = `${new Date().toLocaleString('en-EN', {month: 'long'}).charAt(0).toUpperCase() +
        new Date().toLocaleString('en-EN', {month: 'long'}).slice(1)} ${new Date().getFullYear()}`;
    };
    CurrentMonth.textContent = moisActuel;

}



langselected = document.querySelectorAll(".language button");
langselected.forEach(i => i.addEventListener("click", () => {
    langselected.forEach(btn => btn.classList.remove("active"));
    i.classList.add("active");
    languageValue = i.dataset.lang;
    setLanguage(languageValue);
    localStorage.setItem("langStored", languageValue);
    updateExpense();
}));

currselected = document.querySelectorAll(".devise button");
currselected.forEach( i=> i.addEventListener("click", ()=>{
    currselected.forEach(btn=>btn.classList.remove("active"));
    i.classList.add("active");
    currencyValue = i.dataset.currency;
    //setCurrency(currencyValue);
    localStorage.setItem("currencyStored", currencyValue);
    updateExpense();
    budgetContainer.textContent = `${Budgets}${currencies[currencyValue].val}`;

    transactionsList.innerHTML ="";
    transactions.forEach((transaction)=> displayTransactionExpense(transaction));





}));



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
    expenseAmountToDisplay.textContent = `${expense.expenseAmount}${currencies[currencyValue].val}`;
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


    inputval.addEventListener('keydown', (e)=> {
        if (e.key === "Enter"){
            budgetContainer.textContent = `${inputval.value}${currencies[currencyValue].val}`;
            inputval.replaceWith(budgetContainer);
            budgetvar = +inputval.value;

            Budgets = budgetvar;

            localStorage.setItem("Budget", JSON.stringify(budgetvar));

            updateExpense();
        }
    })

};

let languageValue = "en"; // langue par défaut
let currencyValue = "usd"; //currency par défaut pour coller à langue par défaut = en

function updateExpense(){
    let total_expense = transactions.reduce(  (sum, currentValue)=> sum + currentValue.expenseAmount ,0   );

    let mean_expense = Math.round(transactions.length >0 ? total_expense/transactions.length : 0);

    let pourcentage = +Budgets>0 ? Math.min ( (total_expense / +Budgets)*100, 100 ): 0 ;
    expenseJauge.style.width = `${pourcentage}%`;
    console.log(pourcentage);

    let solde = +Budgets - total_expense;
    expenseBalance.textContent = `${solde}${currencies[currencyValue].val}`;
    expenseBalance.style.color = solde < 0 ? "red" : "var(--color-text-main)";

    expenseContainer.textContent = `${total_expense}${currencies[currencyValue].val}`;
    transactionTotal.textContent = transactions.length;

    expenseMean.textContent = `${translations[languageValue].moyDepense} : ${mean_expense}${currencies[currencyValue].val}` ;


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

    languageValue = localStorage.getItem("langStored") || "en" ;
    setLanguage(languageValue);
    document.querySelector(`.language button[data-lang="${languageValue}"]`).classList.add("active");

    currencyValue = localStorage.getItem("currencyStored") || "usd";
    document.querySelector(`.devise button[data-currency = "${currencyValue}"]`).classList.add("active");



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


    let modeValue = localStorage.getItem("mode");
    if (modeValue === "true"){

        document.body.classList.add("dark");
        darkMode.checked = true;

    }else{

    };





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

    budgetContainer.textContent = `${Budgets}${currencies[currencyValue].val}`;


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
