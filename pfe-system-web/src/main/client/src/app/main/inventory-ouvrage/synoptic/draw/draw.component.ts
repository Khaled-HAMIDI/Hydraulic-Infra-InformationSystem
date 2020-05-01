import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { nodes, node, link, images } from './images'
import { repeat, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
declare var Diagram: any;
declare var cola: any;
declare var d3: any;


@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class DrawComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  ouvrages = [];
  links = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fuseTranslationLoader: FuseTranslationLoaderService
  ) {
    this._unsubscribeAll = new Subject();
    //this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (response) => {
        console.log(response.data);
        this.initSynopticStructure(response.data[0], response.data[1]);
        this.drawSchema();
      },
      (error) => {
        console.log(error);
      }
    );


  }

  initSynopticStructure(chains, ouvrages) {
    ouvrages.forEach((ouv) => {
      var n = new node();
      ouv.name = ouv.name.replace(' ', '')
      n.name = ouv.name + '-';
      n.icon = images.SP;
      n.meta = {
        title: ouv.name
      }
      this.ouvrages.push(n);
    })
    chains.forEach((chain) => {
      chain.ouvrages.sort(this.compare);
      var l;
      for (var i = 0; i < chain.ouvrages.length - 1; i++) {
        l = new link();
        l.source = chain.ouvrages[i].name.replace(' ', '') + '-';
        l.target = chain.ouvrages[i + 1].name.replace(' ', '') + '-';
        var ind = this.links.findIndex((link) => {
          return ((link.source === l.source) && (link.target === l.target))
        });
        //if (ind != 1)
        this.links.push(l);
      }
    })
  }
  compare(a, b) {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
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
          .style("left", (d3.event.pageX) - 180 + "px")
          .style("top", (d3.event.pageY) - 100  + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  drawSchema() {
    var n = { nodes: this.ouvrages, links: this.links }
    d3.select("#diagram").attr('class', 'hello');
    var diagram = new Diagram('#diagram', n, { pop: /^([^\s-]+)-/ });
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
      var div = d3.select(".tooltip")
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
        var line = d3.select("#path" + i);
        if (line.node()) {
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
      }

    });

    function currentScale() {
      return d3.transform(diagram.svg.attr('transform')).scale[0];
    }
    diagram.init('title', 'bandwidth', 'interface');

  }
  filter(code, ouvrages): Array<any> {
    return ouvrages.filter((ouvrage) => {
      return ouvrage['code'] == code
    })
  }

  ngOnDestroy(): void {
    d3.selectAll("path").transition();
    //d3.selectAll("svg > *").remove();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
