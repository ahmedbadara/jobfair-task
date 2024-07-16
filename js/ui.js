export function displayCustomers(customers, transactions) {
    const customerTable = $('#customer-table');
    customerTable.empty();
  
    customers.forEach(customer => {
      const customerTransactions = transactions.filter(t => t.customer_id === customer.id);
      const totalAmount = customerTransactions.reduce((sum, t) => sum + t.amount, 0);
  
      const row = `
        <tr>
          <th scope="row">${customer.id}</th>
          <td>${customer.name}</td>
          <td>${totalAmount}</td>
          <td><button class="btn btn-outline-light fs-5 view-transaction" data-id="${customer.id}">view</button></td>
        </tr>
      `;
      customerTable.append(row);
    });
  
    $('.view-transaction').on('click', function () {
      const customerId = $(this).data('id');
      const customerTransactions = transactions.filter(t => t.customer_id === customerId);
      console.log(`Customer ID: ${customerId}`, customerTransactions);
      displayGraph(customerTransactions);
    });
  }
  
  export function filterTable(query) {
    $('#customer-table tr').each(function () {
      const name = $(this).find('td:nth-child(2)').text().toLowerCase();
      const amount = $(this).find('td:nth-child(3)').text().toLowerCase();
      if (name.includes(query) || amount.includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
  
  export function displayGraph(transactions) {
    const ctx = document.getElementById('transaction-graph').getContext('2d');
    const labels = transactions.map(t => t.date);
    const data = transactions.map(t => t.amount);
  
    console.log('Graph Data:', { labels, data });
  
    if (window.chart) {
      window.chart.destroy();
    }
  
    window.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Transaction Amount',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Amount'
            }
          }
        }
      }
    });
  }
  