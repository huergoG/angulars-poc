import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  private data = [
    { Framework: 'Vue', Stars: 166443, Released: 2014 },
    { Framework: 'React', Stars: 150793, Released: 2013 },
    { Framework: 'Angular', Stars: 62342, Released: 2016 },
    { Framework: 'Backbone', Stars: 27642, Released: 2010 },
    { Framework: 'Ember', Stars: 21471, Released: 2011 }
  ];

  private svg;
  private margin = 50;
  private width = 750;
  private height = 400;
  private radius = Math.min(this.width,this.height)/2 - this.margin;
  private colors;

  constructor() { }

  ngOnInit(): void {
    this.createSVG();
    this.createColors();
    this.drawChart();
  }

  private createSVG(): void {
    this.svg = d3.select('figure#pie')
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.margin * 2))
    .append('g')
    .attr('transform', `translate(${this.width / 2},${this.height / 2 })`);
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.Stars.toString()))
    .range(['#c7d3e6', '#a5b8db', '#879cc4', '#677795','#5a6782']);
  }

  private drawChart(): void {
// Compute the position of each group on the pie:
      const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

      // Build the pie chart
      this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

      // Add labels
      const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

      this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text(d => d.data.Framework)
      .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }

}
