import {render, screen, fireEvent} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import AssignmentTwo from './AssignmentTwo'


describe('Display all Satellites launched in specified date range', () => {
    test('Display warning when user click on search button with empty search field', async () => {
        render(<AssignmentTwo/>)
        
        const startDateValue = '01-01-2019'
        const endDateValue = '12-01-2020'

        const startDate = screen.getByTestId('start-date')
        const endDate = screen.getByTestId('end-date')

        fireEvent.change(startDate, {target: {value: startDateValue}})
        fireEvent.change(endDate, {target: {value: endDateValue}})
        //When user click on search button with no data in search field

        const buttonElement = screen.getByText('satellites')
        userEvent.click(buttonElement)

        const result = await screen.findAllByText(/STARLINK-3/)
        expect(result).toHaveLength(10)
    })

    test('Display nothing when user input no data to start and end date fields', async () => {
        render(<AssignmentTwo/>)

        //When user click on search button with no data in search field

        const buttonElement = screen.getByText('satellites')
        userEvent.click(buttonElement)

        expect(screen.queryByText(/STARLINK-3/)).toBeNull()
    })
    
})