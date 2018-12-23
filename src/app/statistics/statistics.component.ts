import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import * as Plotly from 'plotly.js';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  private get defaultLayout(): Partial<Plotly.Layout> {
    return {
      xaxis: {
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      yaxis: {
        titlefont: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    };
  }

  constructor(
    private statisticsService: StatisticsService
  ) {
    this.initCustomerOrdersCountChart();
  }

  ngOnInit() {
  }

  async initCustomerOrdersCountChart() {
    const customerOrdersRes = await this.statisticsService.getCustomerOrders().toPromise();

    const labelIds = [];
    const counts = [];
    customerOrdersRes.forEach(el => {
      labelIds.push(`${el.CustomersName} (${el.CustomersId})`);
      counts.push(el.OrdersCount);
    });

    const chartData: Partial<Plotly.PlotData>[] = [
      {
        x: labelIds,
        y: counts,
        type: 'bar'
      }
    ];

    const layout = this.defaultLayout;
    layout.title = 'Top 10 most active customers';
    layout.xaxis.title = 'Customers';
    layout.yaxis.title = 'Orders count';

    Plotly.plot('customer-orders-count-chart', chartData, layout);
  }
}
