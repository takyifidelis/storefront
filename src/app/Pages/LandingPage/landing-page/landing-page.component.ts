import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../Authentication/CommonComponent/login/login.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() { }
}
