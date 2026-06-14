import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService, PortfolioData } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  readonly dataService = inject(PortfolioDataService);
  private readonly router = inject(Router);

  isLoggedIn = false;
  password = '';
  loginError = false;

  activeTab = 'sections'; // 'sections', 'profile', 'experience', 'skills', 'projects', 'github'
  
  editorData!: PortfolioData;

  // GitHub Sync credentials
  gitUsername = '';
  gitRepo = '';
  gitToken = '';
  gitBranch = 'main';
  isSyncing = false;

  constructor() {
    this.resetFormCopy();
    this.loadGitSettings();
  }

  resetFormCopy() {
    this.editorData = JSON.parse(JSON.stringify(this.dataService.data()));
  }

  loadGitSettings() {
    this.gitUsername = localStorage.getItem('git_username') || '';
    this.gitRepo = localStorage.getItem('git_repo') || '';
    this.gitToken = localStorage.getItem('git_token') || '';
    this.gitBranch = localStorage.getItem('git_branch') || 'main';
  }

  saveGitSettings() {
    localStorage.setItem('git_username', this.gitUsername);
    localStorage.setItem('git_repo', this.gitRepo);
    localStorage.setItem('git_token', this.gitToken);
    localStorage.setItem('git_branch', this.gitBranch);
  }

  login() {
    if (this.password === 'admin' || this.password === 'admin123') {
      this.isLoggedIn = true;
      this.loginError = false;
      this.resetFormCopy();
    } else {
      this.loginError = true;
      this.password = '';
    }
  }

  save() {
    this.dataService.saveData(this.editorData);
    this.saveGitSettings();
    alert('Changes saved successfully! Reflected instantly on the local website.');
  }

  reset() {
    if (confirm('Are you sure you want to reset all configurations to defaults? This will overwrite your current settings.')) {
      this.dataService.resetData();
      this.resetFormCopy();
      alert('Reset completed successfully!');
    }
  }

  export() {
    this.dataService.exportConfig();
  }

  async syncGitHub() {
    this.saveGitSettings();
    if (!this.gitUsername || !this.gitRepo || !this.gitToken) {
      alert('Please fill out all credentials under the "GitHub Settings" tab before syncing.');
      this.activeTab = 'github';
      return;
    }

    this.isSyncing = true;
    try {
      // Save data locally first
      this.dataService.saveData(this.editorData);
      
      // Perform HTTP PUT request to push configuration to repo
      await this.dataService.syncToGitHub(
        this.gitUsername,
        this.gitRepo,
        this.gitToken,
        this.gitBranch
      );
      
      alert('Success! Configuration committed to GitHub. Your Netlify site will update in 1-2 minutes!');
    } catch (e: any) {
      console.error(e);
      alert('Sync failed: ' + (e.message || 'Please check your token permissions, repository name, or internet connection.'));
    } finally {
      this.isSyncing = false;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.password = '';
  }

  goToWebsite() {
    this.router.navigate(['/']);
  }

  // Subtitles Handlers
  addSubtitle() {
    this.editorData.profile.subtitles.push('New Role');
  }

  removeSubtitle(index: number) {
    this.editorData.profile.subtitles.splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  // Stats Handlers
  addStat() {
    this.editorData.profile.stats.push({ number: '0', label: 'Label' });
  }

  removeStat(index: number) {
    this.editorData.profile.stats.splice(index, 1);
  }

  // Company Experience Handlers
  addCompany() {
    this.editorData.experience.list.push({
      company: 'New Company Limited',
      logoText: 'NC',
      role: 'Software Engineer',
      duration: 'Year - Year',
      location: 'City, Country',
      summary: 'Describe your job responsibilities and highlights.',
      achievements: [],
      visible: true
    });
  }

  removeCompany(index: number) {
    if (confirm('Are you sure you want to delete this entire company and all its achievements?')) {
      this.editorData.experience.list.splice(index, 1);
    }
  }

  // Achievements Handlers (Mapped under specific company)
  addAchievement(companyIndex: number) {
    this.editorData.experience.list[companyIndex].achievements.push({
      title: 'New Achievement',
      text: 'Describe achievement details here.',
      tag: 'General',
      icon: 'fa-solid fa-star',
      visible: true
    });
  }

  removeAchievement(companyIndex: number, achievementIndex: number) {
    this.editorData.experience.list[companyIndex].achievements.splice(achievementIndex, 1);
  }

  // Skills Handlers
  addSkill(categoryIndex: number) {
    this.editorData.skills.categories[categoryIndex].skills.push({
      name: 'New Skill',
      level: 80
    });
  }

  removeSkill(categoryIndex: number, skillIndex: number) {
    this.editorData.skills.categories[categoryIndex].skills.splice(skillIndex, 1);
  }

  // Projects Handlers
  addProject() {
    this.editorData.projects.list.push({
      title: 'New Project Title',
      category: 'Professional Project',
      description: 'Project summary description goes here.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      icon: 'fa-solid fa-briefcase',
      link: '#',
      visible: true
    });
  }

  removeProject(index: number) {
    this.editorData.projects.list.splice(index, 1);
  }

  addTag(projectIndex: number, tagInput: HTMLInputElement) {
    const value = tagInput.value.trim();
    if (value) {
      this.editorData.projects.list[projectIndex].tags.push(value);
      tagInput.value = '';
    }
  }

  removeTag(projectIndex: number, tagIndex: number) {
    this.editorData.projects.list[projectIndex].tags.splice(tagIndex, 1);
  }
}
