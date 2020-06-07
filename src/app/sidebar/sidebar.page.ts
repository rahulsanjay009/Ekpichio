import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {
  folder:string=""
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
