import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

// Detection.
import { ChangeDetector } from '../@detection/change-detector.class';
import { ChangeDetectionHelper } from '../@detection/lib/change-detection-helper.abstract';

// Decorator.
import { ChangeDetection } from '../@detection/lib/change-detection.decorator';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.scss']
})
@ChangeDetection<DetectionComponent>({
  properties: {
    'title': true,
    'age': true,
  }
})
export class DetectionComponent
  extends ChangeDetectionHelper<DetectionComponent, { title: number  }>
  implements AfterViewInit, OnInit
  {

  public age = 27;
  public title = 'The book';

  changeDetector!: ChangeDetector<DetectionComponent>;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngOnInit(): void {
    this.detection = true;
    // this.changeDetector.detection.disable();
    // this.changeDetector.detection.deactivate('age');
    this.age = 37;
  }

  ngAfterViewInit(): void {
    this.age = 47;
  }
}
