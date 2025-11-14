import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';

@Component({
    selector: 'view-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    open(): void {
        this.element.style.display = 'block';
    }

    close(): void {
        this.element.style.display = 'none';
    }

    ngOnInit(): void {
        document.body.appendChild(this.element);
        this.modalService.add(this);
        this.element.style.display = 'none';
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

}