import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ClipboardService } from './clipboard/clipboard.service';
import * as jquery from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  err: string;
  input: string;
  inputJson: JSON;
  expanded: boolean;
  copied: boolean = false;
  copyPrettyJsonCaption: string = 'Copy Pretty Json';
  copyUglyJsonCaption: string = 'Copy Ugly Json';
  expCollapseCaption: string = 'Expand All';
  @ViewChild('copyPrettyJson') copyPrettyJson: ElementRef;
  @ViewChild('copyUglyJson') copyUglyJson: ElementRef;

  constructor(private clipboardService: ClipboardService, private renderer2: Renderer2) { }
  ngOnInit(): void {
    this.update(this.input);
  }
  formatAndCopyPrettyJson(json: string) {
    this.update(json);
    if (this.inputJson) {
      this.copied = this.clipboardService.copyFromContent(JSON.stringify(this.inputJson, undefined, 2));
      this.renderer2.setAttribute(this.copyPrettyJson.nativeElement, 'class', 'btn btn-sm btn-success');
      this.copyPrettyJsonCaption = 'Cop\'d Pretty Json';
      setTimeout(() => {
        this.copyPrettyJsonCaption = 'Copy Pretty Json';
        this.renderer2.setAttribute(this.copyPrettyJson.nativeElement, 'class', 'btn btn-sm btn-primary');
      }, 1000);
    }
  }
  formatAndCopyUglyJson(json: string) {
    this.update(json);
    if (this.inputJson) {
      this.copied = this.clipboardService.copyFromContent(JSON.stringify(this.inputJson));
      this.renderer2.setAttribute(this.copyUglyJson.nativeElement, 'class', 'btn btn-sm btn-success');
      this.copyUglyJsonCaption = 'Cop\'d Ugly Json';
      setTimeout(() => {
        this.copyUglyJsonCaption = 'Copy Ugly Json';
        this.renderer2.setAttribute(this.copyUglyJson.nativeElement, 'class', 'btn btn-sm btn-primary');
      }, 1000);
    }
  }
  expCollapse() {
    if (this.expanded) {
      this.expanded = false;
      this.expCollapseCaption = 'Expand All';
    } else {
      this.expanded = true;
      this.expCollapseCaption = 'Collapse';
    }
  }
  formatJson(json: string) {
    this.update(json);
  }
  private update(input: string) {
    if (!input || !input.length) {
      this.inputJson = JSON;
      return;
    }
    try {
      this.err = undefined;
      this.inputJson = JSON.parse(input);
    } catch (e) {
      this.err = e.message;
      this.inputJson = undefined;
    }
  }
}
