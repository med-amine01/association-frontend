import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private renderer: Renderer2) {}


  // ngOnInit() {
  //   this.loadScript('/assets/plugins/chart.js/Chart.min.js');
  //   this.loadScript('/assets/dist/js/pages/dashboard3.js');
  // }
  //
  // loadScript(url: string) {
  //   const script = this.renderer.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = url;
  //   this.renderer.appendChild(document.body, script);
  // }

  ngOnInit() {
    this.loadScript('/assets/plugins/chart.js/Chart.min.js', () => {
      this.loadScript('/assets/dist/js/pages/dashboard3.js', () => {
        // Callback function for the second script
      });
    });
  }

  loadScript(url: string, callback: () => void) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    this.renderer.appendChild(document.body, script);
  }


}
