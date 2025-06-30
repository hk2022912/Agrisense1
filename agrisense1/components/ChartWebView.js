import React from 'react';
import { WebView } from 'react-native-webview';

const ChartWebView = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          background: #e0f7cf;
        }
        canvas {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <canvas id="myChart"></canvas>
      <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
            datasets: [{
              label: 'Crop Health',
              data: [40, 35, 45, 60, 20, 55],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        });
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      style={{ height: 300 }}
      javaScriptEnabled
      domStorageEnabled
      scrollEnabled={false}
    />
  );
};

export default ChartWebView;
