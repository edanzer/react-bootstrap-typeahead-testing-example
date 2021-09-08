import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

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

  it('renders empty Typehead search field', () => {
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

describe('Search works correctly', () => {
  afterEach(cleanup);

  it('shows search results correctly', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />);
    const input = getByPlaceholderText("Choose State");

    // Start searching for Colorado by inputing 'colo'
    fireEvent.change(input, {target: {value: 'colo'}}); 
    
    // Click on Colorado in the resulting drop down list
    const selection = getByRole('option', { name : 'Colorado' });
    fireEvent.click(selection);
    
    // Check that result has been output on page
    expect(getByText("Colorado")).toBeInTheDocument();
    
  });
});