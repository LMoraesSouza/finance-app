import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },

    resources: {
        en: {
            translation: {
                welcome: {
                    back: "Welcome back",
                    message: "This is your Financial Overview Report",
                },

                chart: {
                    noData: "No data for this period",

                    pie: "Pie Chart",
                    radar: "Radar Chart",
                    radial: "Radial Chart",

                    area: "Area chart",
                    bar: "Bar Chart",
                    line: "Line Chart",
                },

                tooltip: {
                    incomeExpense: "Use [+] for income and [-] for expenses",
                    countAsIncome: "This will count as income",
                    countAsExpense: "This will count as expense",
                },

                confirm: {
                    sure: "Are you sure?",
                    delete: {
                        bulk: "You are about to perform a bulk delete",
                        transaction: 'You are about to delete this transaction',

                        category: "You are about to delete this category",

                        account: "You are about to delete this account",
                    }
                },

                sheet: {
                    account: {
                        new: {
                            title: "New Account",
                            message: "Create a new account to track your transactions.",
                            confirmButton: "Create account",
                        },

                        edit: {
                            title: "Edit Account",
                            message: "Edit an existing account.",
                            confirmButton: "Save Changes",
                            deleteButton: "Delete Account",
                        },

                        inputPlaceholder: "e.g Cash, Bank, Credit Card",
                    },

                    category: {
                        new: {
                            title: "New Category",
                            message: "Create a new category to organize your transactions.",
                            confirmButton: "Create category",
                        },

                        edit: {
                            title: "Edit Category",
                            message: "Edit an existing category.",
                            confirmButton: "Save Changes",
                            deleteButton: "Delete Category",
                        },

                        inputPlaceholder: "e.g Food, Travel, Pets",
                    },

                    transaction: {
                        new: {
                            title: "New Transaction",
                            message: "Create a new transaction to track your finances.",
                            confirmButton: "Create Transaction",
                        },

                        edit: {
                            title: "Edit Transaction",
                            message: "Edit an existing transaciton.",
                            confirmButton: "Save Changes",
                            deleteButton: "Delete Transaction",
                        },

                        notesPlaceholder: "Optional Notes",
                        payeePlaceholder: "Add a payee",
                        categoryPlaceholder: "Select a category",
                        accountPlaceholder: "Select an account",
                    }
                },

                Accounts: "Accounts",
                accountsPage: "Accounts page",
                Account: "Account",
                Categories: "Categories",
                categoriesPage: "Categories page",
                Category: "Category",
                Overview: "Overview",
                Transactions: "Transactions",
                Payee: "Payee",
                Settings: "Settings",
                pickDate: "Pick a date",
                Reset: "Reset",
                Apply: "Apply",
                Delete: "Delete",
                Edit: "Edit",
                noResults: "No results.",
                Next: "Next",
                Previous: "Previous",
                of: "of",
                rowSelected: "row(s) selected",
                Expenses: "Expenses",
                Income: "Income",
                Balance: "Balance",
                fromLastPeriod: "from last period",
                allAccounts: "All accounts",
                Import: "Import",
                selectAccountToContinue: "Please select an account to continue.",
                transactionsHistory: "Transaction history",
                addNew: "Add new",
                importTransactions: "Import Transactions",
                Cancel: "Cancel",
                Continue: "Continue",
                Confirm: "Confirm",
                Date: "Date",
                Amount: "Amount",
                Uncategorized: "Uncategorized",
                Name: "Name",
                Notes: "Notes",
            }
        },

        pt: {
            translation: {
                welcome: {
                    back: "Bem-vindo de volta",
                    message: "Esse é sua visão geral do relatório financeiro",
                },

                chart: {
                    noData: "Não há dados nesse período",

                    pie: "Gráfico de Pizza",
                    radar: "Gráfico de Radar",
                    radial: "Gráfico Radial",

                    area: "Gráfico de Área",
                    bar: "Gráfico de Barras",
                    line: "Gráfico de Linhas",
                },

                tooltip: {
                    incomeExpense: "Use [+] para receita e [-] para despesas",
                    countAsIncome: "Essa transação contará como receita",
                    countAsExpense: "Essa transação contará como despesa",
                },

                confirm: {

                    sure: "Tem certeza?",
                    delete: {
                        bulk: "Você vai efetuar uma exclusão em massa",
                        transaction: 'Você vai deletar essa transação',

                        category: "Você vai deletar essa categoria",

                        account: "Você vai deletar essa conta",
                    }
                },

                sheet: {
                    account: {
                        new: {
                            title: "Nova Conta",
                            message: "Crie uma nova conta para acompanhar suas transações.",
                            confirmButton: "Criar Conta",
                        },

                        edit: {
                            title: "Editar Conta",
                            message: "Altere uma conta existente.",
                            confirmButton: "Salvar Alterações",
                            deleteButton: "Deletar Conta",
                        },

                        inputPlaceholder: "Ex. Dinehiro, Banco, Cartão de Crédito",
                    },

                    category: {
                        new: {
                            title: "Nova Categoria",
                            message: "Crie uma nova categoria para organizar suas transações.",
                            confirmButton: "Criar Categoria",
                        },

                        edit: {
                            title: "Editar Categoria",
                            message: "Altere uma categoria existente.",
                            confirmButton: "Salvar Alterações",
                            deleteButton: "Deletar categoria",
                        },

                        inputPlaceholder: "Ex. Comida, Viagens, Pets",
                    },

                    transaction: {
                        new: {
                            title: "Nova Transação",
                            message: "Crie uma nova transação para acompanhar suas finanças.",
                            confirmButton: "Criar Transação",
                        },

                        edit: {
                            title: "Editar Transação",
                            message: "Altere uma transação existente.",
                            confirmButton: "Salvar Alterações",
                            deleteButton: "Deletar Transação",
                        },

                        notesPlaceholder: "Notas (opcional)",
                        payeePlaceholder: "Informe a origem",
                        categoryPlaceholder: "Selecione uma categoria",
                        accountPlaceholder: "Selecione uma conta",
                    }
                },

                Accounts: "Contas",
                accountsPage: "Contas",
                Account: "Conta",
                Categories: "Categorias",
                categoriesPage: "Categorias",
                Category: "Categoria",
                Overview: "Visão Geral",
                Transactions: "Transações",
                Payee: "Origem",
                Settings: "Configurações",
                pickDate: "Escolha uma data",
                Reset: "Reiniciar",
                Apply: "Aplicar",
                Delete: "Excluir",
                Edit: "Editar",
                noResults: "Nenhum resultado.",
                Next: "Próxima",
                Previous: "Anterior",
                of: "de",
                rowSelected: "linha(s) selecionadas",
                Expenses: 'Despesas',
                Income: "Receita",
                Balance: "Saldo",
                fromLastPeriod: "do período anterior",
                allAccounts: "Todas contas",
                Import: "Importar",
                selectAccountToContinue: "Selecione uma conta para prosseguir.",
                transactionsHistory: "Histórico de transações",
                addNew: "Adicionar",
                importTransactions: "Importar Transações",
                Cancel: "Cancelar",
                Continue: "Continuar",
                Confirm: "Confirmar",
                Date: "Data",
                Amount: "Valor",
                Uncategorized: "Não Categorizado",
                Name: "Nome",
                Notes: "Notas",
            }
        }
    }
});


export default i18next;