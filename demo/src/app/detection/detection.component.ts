import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

// Detection.
import { ChangeDetectionHelper } from '../@detection/lib/change-detection-helper.abstract';

// Decorator.
import { ChangeDetection } from '../@detection/lib/change-detection.decorator';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.scss']
})
@ChangeDetection<DetectionComponent>({
  'title': true,
  'age': true,
})
export class DetectionComponent
  extends ChangeDetectionHelper<DetectionComponent, { title: number  }>
  implements AfterViewInit, OnInit
  {

  public age = 27;
  public title = 'The book';

  // changeDetector!: ChangeDetector<DetectionComponent>;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngOnInit(): void {
    this.detection = true;

    // Disable detection in component.
    this.changeDetector?.detection.disable();

    // Disable property age detection.
    this.changeDetector?.detection.deactivate('age');

    this.age = 37;
  }

  ngAfterViewInit(): void {
    this.age = 47;
  
    // changeDetector.
    console.info(`Works!`, this.changeDetector);

    // detach.
    if (this.detach) {
      console.info(`Works!`, this.detach(), this.detached);
    }

    if (this.detached) {
      console.info(`Works!`, this.detached = false);
    }

    // detect.
    if (this.detect) {
      console.info(`Works!`, this.detect());
    }

    // properties.
    if (this.properties) {
      console.info(`Works!`, this.properties);
    }

    if (this.reattach) {
      console.info(`Works!`, this.reattach(), this.detached);
    }

  }
}
