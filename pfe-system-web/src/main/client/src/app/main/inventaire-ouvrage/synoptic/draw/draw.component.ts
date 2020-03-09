import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ouvrages } from './ouvrages'
import { images } from './images'

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  ctx;
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  constructor() { }

  ngOnInit() {
    //---Forage
    this.ctx = this.canvas.nativeElement.getContext('2d');
    var forageImg = new Image();
    forageImg.onload = () => {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1.5
      this.filter('F', ouvrages).forEach((forage, i) => {
        this.ctx.drawImage(forageImg, 30 + i * 70, 30, 43, 48)
        this.ctx.moveTo(30 + i*70 + 21, 30+48)
        this.ctx.lineTo(30 + 106.5 + 20, 130)
      })
      this.ctx.stroke()
    }
    forageImg.src = images['F']
    //---Reservoir
    var resImg = new Image();
    resImg.onload = () => {
      this.filter('R', ouvrages).forEach((res, i) => {
        this.ctx.drawImage(resImg, 30 + 106.5, 150, 43, 48)
        this.ctx.beginPath();
        this.ctx.lineWidth = 1.5
        this.ctx.moveTo(30 + 106.5 + 20, 150)
        this.ctx.lineTo(30 + 106.5 + 20, 130)
        this.ctx.moveTo(30 + 106.5 + 20, 150+48)
        this.ctx.lineTo(30 + 106.5 + 20, 150 + 150)
        this.ctx.stroke()
      })
    }
    resImg.src = images['R']
    //--Population
    this.ctx.lineWidth = 2
    this.ctx.strokeRect(30 + 106.5 + 20 - 50, 150 + 150,100,35)
    this.ctx.font = "14px Arial";
    this.ctx.fillText('Population',30 + 106.5 + 20 - 35, 150 + 150+17)
  }

  drawSchema() {

  }
  filter(code, ouvrages): Array<any> {
    return ouvrages.filter((ouvrage) => {
      return ouvrage['code'] == code
    })
  }

}
