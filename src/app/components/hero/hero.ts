import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  readonly dataService = inject(PortfolioDataService);
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  currentRole = '';
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  typingSpeed = 100;
  typingTimeout: any;

  ctx!: CanvasRenderingContext2D | null;
  particles: any[] = [];
  animationFrameId!: number;
  mouse = { x: -1000, y: -1000 };

  ngAfterViewInit() {
    this.startTyping();
    this.initCanvas();
  }

  ngOnDestroy() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  startTyping() {
    const roles = this.dataService.data().profile.subtitles;
    if (!roles || roles.length === 0) {
      this.currentRole = '';
      this.typingTimeout = setTimeout(() => this.startTyping(), 1000);
      return;
    }

    if (this.roleIndex >= roles.length) {
      this.roleIndex = 0;
    }

    const fullText = roles[this.roleIndex];

    if (this.isDeleting) {
      this.currentRole = fullText.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.typingSpeed = 50;
    } else {
      this.currentRole = fullText.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.typingSpeed = 100;
    }

    if (!this.isDeleting && this.charIndex === fullText.length) {
      this.isDeleting = true;
      this.typingSpeed = 2000; // Wait longer when text is complete
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % roles.length;
      this.typingSpeed = 500; // Delay before typing next text
    }

    this.typingTimeout = setTimeout(() => this.startTyping(), this.typingSpeed);
  }

  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    this.animateParticles();
  }

  onResize = () => {
    this.resizeCanvas();
  };

  onMouseMove = (e: MouseEvent) => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  };

  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (canvas && parent) {
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
    }
  }

  animateParticles() {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
    this.ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';

    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

      const dxMouse = this.mouse.x - p.x;
      const dyMouse = this.mouse.y - p.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 180) {
        const force = (180 - distMouse) / 180;
        p.x -= dxMouse * force * 0.03;
        p.y -= dyMouse * force * 0.03;
      }

      this.ctx!.beginPath();
      this.ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx!.fill();

      for (let j = idx + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.12;
          this.ctx!.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          this.ctx!.lineWidth = 0.5;
          this.ctx!.beginPath();
          this.ctx!.moveTo(p.x, p.y);
          this.ctx!.lineTo(p2.x, p2.y);
          this.ctx!.stroke();
        }
      }
    });

    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }

  printResume() {
    window.print();
  }
}
