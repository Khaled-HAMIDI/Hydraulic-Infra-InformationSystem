import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { nodes, node, link, images, generalType } from './images'
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
  chains = [];
  ouvragesInfo = [];
  links = [];
  selectAllOn: boolean = true;
  selectedChains = []
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
        this.chains = response.data[0];
        this.ouvragesInfo = response.data[1];
        this.selectedChains.push('all');
        this.initSynopticStructure(response.data[0], response.data[1]);
        this.drawSchema();
      },
      (error) => {
        console.log(error);
      }
    );


  }

  initSynopticStructure(chains, ouvrages) {
    let debit;
    ouvrages.forEach((ouv) => {
      var n = new node();
      ouv.site.name = ouv.site.name.replace(' ', '')
      n.name = ouv.site.name + '-' + ouv.code;
      if (ouv.type == generalType.Reservoir) {
        n.icon = images.R;
      }
      if (ouv.type == generalType.Forage) {
        n.icon = images.F;
      }
      if (ouv.type == generalType.StationTraitementConventionelle) {
        n.icon = images.TC;
      }
      if (ouv.type == generalType.StationTraitementNonConventionelle) {
        n.icon = images.TNC;
      }
      if (ouv.type == generalType.BriseCharge) {
        n.icon = images.B;
      }
      if (ouv.type == generalType.StationPompage) {
        n.icon = images.SP;
      }
      n.meta = {
        title: ouv.name,
      }
      this.ouvrages.push(n);
    })
    chains.forEach((chain) => {
      this.selectedChains.push(chain.code);
      chain.ouvrages.sort(this.compare);
      var l;
      for (var i = 0; i < chain.ouvrages.length - 1; i++) {
        l = new link();
        l.source = chain.ouvrages[i].site.replace(' ', '') + '-' + chain.ouvrages[i].code;
        l.target = chain.ouvrages[i + 1].site.replace(' ', '') + '-' + chain.ouvrages[i + 1].code;
        debit = ouvrages.find((ouv) => {
          return ouv.code === chain.ouvrages[i].code
        }).currentDebit
        console.log(debit);
        l.meta = { interface: { source: '', target: '' } };
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

  SetTooltips(div, ouvrages) {
    var html = '';
    d3.selectAll("g.node")
      .on("mouseover", function (d) {
        var id = d.id
        html = '<span class="tooltiptext">Nom : ' + ouvrages[id].name + '</span><br>';
        html += '<span class="tooltiptext">Débit Actuel : ' + ouvrages[id].currentDebit + '</span><br>'
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(html)
          .style("left", (d3.event.pageX) - 180 + "px")
          .style("top", (d3.event.pageY) - 100 + "px");
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
      this.SetTooltips(div, this.ouvragesInfo);
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

  selectChains(index) {
    let npath = 0;
    if (this.selectedChains.includes('all')) {
      this.selectedChains = this.selectedChains.filter(chain => chain !== 'all')
    }
    else {
      if (this.selectedChains.length === this.chains.length)
        this.selectedChains = [...this.selectedChains, 'all']
    }
    if (this.selectedChains.includes(this.chains[index].code)) {
      for (var i = 0; i < index; i++) {
        npath += this.chains[i].ouvrages.length - 1
      }
      for (var j = 0; j < this.chains[index].ouvrages.length - 1; j++) {
        d3.select("#link" + npath).style("display", "block")
        d3.select("#path" + npath).style("opacity", "1")
        npath++;
      }
    }
    else {
      for (var i = 0; i < index; i++) {
        npath += this.chains[i].ouvrages.length - 1
      }
      for (var j = 0; j < this.chains[index].ouvrages.length - 1; j++) {
        d3.select("#link" + npath).style("display", "none")
        d3.select("#path" + npath).style("opacity", "0")
        npath++;
      }
    }
  }

  selectAll() {
    if (this.selectedChains.includes('all')) {
      this.chains.forEach((chain) => {
        if (!this.selectedChains.includes(chain.code))
          this.selectedChains = [...this.selectedChains, chain.code]
      })
      // Line and path style
      d3.selectAll("line").style("display", "block");
      d3.selectAll("path").style("opacity", "1");
    } else {
      this.selectedChains = [];
      d3.selectAll("line").style("display", "none");
      d3.selectAll("path").style("opacity", "0");
    }
  }

  ngOnDestroy(): void {
    d3.selectAll("path").transition();
    //d3.selectAll("svg > *").remove();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
