import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

/* 
 * This just contains very simple tests to confirm
 * that the app loads correction for initial state.
 */
describe('App content on initial load', () => {
  
  afterEach(cleanup);

  it('renders Search title', () => {
    const { getByText } = render(<App />);
    const title = getByText(/Search/i);
    expect(title).toBeInTheDocument();
  });

  it('renders Results title', () => {
    const { getByText } = render(<App />);
    const title = getByText(/Results/i);
    expect(title).toBeInTheDocument();
  });

  it('renders empty Typeahead search field', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText("Choose State");
    expect(input).toBeInTheDocument();
  });

  it('renders search results placeholder', () => {
    const { getByText } = render(<App />);
    const resultsPlaceholder = getByText(/Select an item from the drop down./i);
    expect(resultsPlaceholder).toBeInTheDocument();
  });

});

/* 
 * This test the actual seach logic and results 
 * for the react-bootstrap-typeahead component.
 */
describe('Search works correctly', () => {
  afterEach(cleanup);

  it('shows search results correctly', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />);
    const input = getByPlaceholderText("Choose State");

    /* 
     * Search for Colorado by inputing 'colo'.
     * This will also trigger drop down menu to show.
     */
    fireEvent.change(input, {target: {value: 'colo'}}); 
    
    /* 
     * Click on Colorado in the drop down menu.
     * 'name' refers to aria-label attribute on the option.
     */
    const selection = getByRole('option', { name : 'Colorado' });
    fireEvent.click(selection);
    
    /* 
     * Check that result has been output on page.
     * Replace this with whatever else is supposed 
     * to happen when an item is selected.
     */
    expect(getByText("Colorado")).toBeInTheDocument();
  });
});