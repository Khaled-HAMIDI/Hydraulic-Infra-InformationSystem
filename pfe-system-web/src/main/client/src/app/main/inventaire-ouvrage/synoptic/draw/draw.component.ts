import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { nodes } from './images'
import { repeat } from 'rxjs/operators';
declare var Diagram: any;
declare var cola: any;
declare var d3: any;

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DrawComponent implements OnInit {
  ctx;
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  constructor() { }

  ngOnInit() {
    var diagram = new Diagram('#diagram', nodes, { pop: /^([^\s-]+)-/, bundle: true });
    diagram.on('rendered', () => {
      // d3.selectAll('line').on('mouseover', function (d) {
      //   // Hide all labels
      //   d3.selectAll('.link text').style('visibility', 'hidden');

      //   // Show hovered labels
      //   d3.selectAll(`.link text.${d.path_id()}`).style('visibility', 'visible');
      // }).on('mouseout', function (d) {
      //   if (currentScale() > 1.5) {
      //     // Show all labels
      //     d3.selectAll('.link text').style('visibility', 'visible');
      //   } else {
      //     // Hide hovered labels
      //     d3.selectAll(`.link text.${d.path_id()}`).style('visibility', 'hidden');
      //   }
      // });
      // Define the div for the tooltip
      var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
      // You can also change label position, which is, how far it is from the node along the link line
      this.SetTooltips(div);
      d3.selectAll('.link textPath tspan').attr('x', '40');
      d3.selectAll('.link textPath.reverse tspan').attr('x', '-40');
      d3.selectAll('tspan.title').attr('x', '-20');
      //Water Flow Animation
      d3.selectAll("path").style("opacity", "0.5")
      d3.selectAll("path").style("opacity", "1")
      d3.selectAll("path").each(function (d, i) {
        // Get the length of each line in turn
        repeat(i)
      })
      function repeat(i) {
        var line = d3.select("#path" + i)
        var totalLength = line.node().getTotalLength();
        line.attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(8000)
          // .delay(100)
          .ease("linear") //Try linear, quad, bounce... see other examples here - http://bl.ocks.org/hunzy/9929724
          .attr("stroke-dashoffset", 0)
          // .style("stroke-dasharray","5")
          .style("stroke-width", 2.5)
          .each("end", () => repeat(i))
      }

    });

    function currentScale() {
      return d3.transform(diagram.svg.attr('transform')).scale[0];
    }
    diagram.init('title','bandwidth','interface');

  }

  SetTooltips(div) {
    d3.selectAll("g.node")
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(`<span class="tooltiptext">Nom : Station Kharrouba</span><br>
        <span class="tooltiptext">Débit Actuel : 100 l/s</span><br>
        <span class="tooltiptext">Date mes : 11/12/2000</span><br>
        <span class="tooltiptext">Etat : Bon</span><br>
        `)
          .style("left", (d3.event.pageX + 28) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  drawSchema() {

  }
  filter(code, ouvrages): Array<any> {
    return ouvrages.filter((ouvrage) => {
      return ouvrage['code'] == code
    })
  }

}
