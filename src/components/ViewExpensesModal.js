import { Modal, Button, Stack} from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "./utils"

export default function ViewExpensesModal({budgetId, handleClose}) {
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets()

    const budget = (budgetId === UNCATEGORIZED_BUDGET_ID) ? 
    {   name: "Uncategorized",
        id: UNCATEGORIZED_BUDGET_ID} 
    : budgets.find(budget => budget.id === budgetId)
    
    const expenses = getBudgetExpenses(budgetId)

    return (
    <Modal show = {budgetId != null} onHide = {handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction = "horizontal" gap = "3">
                        <div>Expeneses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick = {() => 
                                {deleteBudget(budget)
                                handleClose()}
                            } variant="outline-danger" 
                            >Delete
                            </Button>
                        )
                        }
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap = "3">
                    {expenses.map(expense => (
                        <Stack direction = "horizontal" gap = "2" key = {expense.id} >
                            <div className="fs-3">{expense.description}</div>
                            <div className="ms-auto fs-4">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>

                    ))}
                </Stack>
            </Modal.Body>
    </Modal>
    )
}

