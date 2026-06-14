import { Component, HostListener, AfterViewInit, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { Header } from '../header/header';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Experience } from '../experience/experience';
import { Skills } from '../skills/skills';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-portfolio',
  imports: [
    Header,
    Hero,
    About,
    Experience,
    Skills,
    Projects,
    Contact,
    Footer
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements AfterViewInit {
  readonly dataService = inject(PortfolioDataService);
  activeSection = 'home';

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  initScrollReveal() {
    // Setup Intersection Observer for reveal-on-scroll animations
    const revealItems = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    // Setup Intersection Observer for active nav highlighting (scroll-spy)
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px',
      }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section');
    
    sections.forEach((sec) => {
      const top = (sec as HTMLElement).offsetTop;
      const height = (sec as HTMLElement).offsetHeight;
      const id = sec.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height && id) {
        this.activeSection = id;
      }
    });
  }
}
