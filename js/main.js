import { fetchData } from './data.js';
import { displayCustomers, filterTable } from './ui.js';

$(document).ready(async function () {
  
  $('.loading').show();

  try {
    const data = await fetchData();
    const customers = data.customers;
    const transactions = data.transactions;
    displayCustomers(customers, transactions);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    
    $('.loading').hide();
  }

  $('#search').on('input', function () {
    const query = $(this).val().toLowerCase();
    filterTable(query);
  });
});
