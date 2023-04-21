import { Component } from '@angular/core';

interface IOptions {
  title: string;
  path: string;
  image: string;
  percent: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  BASE_URL = "/quiz"

  options: IOptions[] = [
    {
      title: "FIGMA",
      path: `${this.BASE_URL}/figma`,
      image: "../../../assets/images/figma.png",
      percent: 40
    },
    {
      title: "UX",
      path: `${this.BASE_URL}/ux`,
      image: "../../../assets/images/ux.png",
      percent: 50
    },
    {
      title: "CSS",
      path: `${this.BASE_URL}/css`,
      image: "../../../assets/images/css.png",
      percent: 80
    },
    {
      title: "JS",
      path: `${this.BASE_URL}/js`,
      image: "../../../assets/images/js.png",
      percent: 70
    },
    {
     title: "HTML",
      path: `${this.BASE_URL}/html`,
      image: "../../../assets/images/html.png",
      percent: 60
    }
  ];

}
