import {render, screen, waitFor} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import { server } from '../../mocks/server'
import AssignmentOne from './AssignmentOne'


describe('Display all failed launches for specified launchpad', () => {

    test('Display warning when user click on search button with empty search field', () => {
        render(<AssignmentOne/>)
        
        //When user click on search button with no data in search field

        const buttonElement = screen.getByTestId('search')
        userEvent.click(buttonElement)

        //Warning message should be displayed
        const warningMessageElement = screen.getByText('Please input correct value', {exact: false})
        expect(warningMessageElement).toBeVisible()
    })

    test('Display object of failures when user input 5e9e4502f5090995de566f86 to search field and press search button', async() => {
        render(<AssignmentOne/>)
        
        //When user input 5e9e4502f5090995de566f86 to search field
        const searchInput = screen.getByTestId('search-input')
        userEvent.paste(searchInput, "5e9e4502f5090995de566f86")
        
        //And user click on "Search button"
        const buttonElement = screen.getByText('Search')
        userEvent.click(buttonElement)

        //Then User should see result object of failed launches
        const items = await waitFor(() => screen.getByText('{"launchpad":"Kwajalein Atoll","all_failures":[{"name":"FalconSat","failures":["merlin engine failure"]},{"name":"DemoSat","failures":["harmonic oscillation leading to premature engine shutdown"]},{"name":"Trailblazer","failures":["residual stage-1 thrust led to collision between stage 1 and stage 2"]}]}'));
        expect(items).toBeVisible()
        
    })

    test("Display correct warning message when user input wrong launchpad ID like (1234567) and press on search button", async () => {
        server.resetHandlers(
            rest.get('https://api.spacexdata.com/v4/launchpads/1234567', (req, res, ctx) => 
                res(ctx.status(404))
            )
        );
        render(<AssignmentOne/>)
        
        //When User input 1234567 to search field
        const searchInput = screen.getByTestId('search-input')
        userEvent.paste(searchInput, "1234567")
        
        //And User click on search button
        const buttonElement = screen.getByText('Search')
        userEvent.click(buttonElement)
        
        //Then Uer should see warining about wrong ID
        const warning = await waitFor(() => screen.getByText('Please input correct ID'))
        expect(warning).toBeVisible()
    })
})