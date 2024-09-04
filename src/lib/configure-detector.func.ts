
// internal
import { ChangeDetector } from '../change-detector/lib/change-detector.ignore.class';
import { DetectionProperties } from '../interface/detection-properties.interface';
import { DetectorOptions } from '../interface/detector-options.interface';

// const.
import { DETECTOR_OPTIONS } from './detector-options.const';

/**
 * Function to use with decorator.
 * @param component Source component for properties.
 * @param properties Properties names to detect changes if true.
 * @param options Change default names assigned to component.
 */
export const configureDetector = <Cmp>(
  component: Function,
  properties: (keyof Cmp)[],
  options: DetectorOptions = DETECTOR_OPTIONS
): void => {

  if (typeObjectGuard<Cmp>(component)) {
    if (typeObjectGuard<DetectorOptions>(options)) {
      options = Object.assign(DETECTOR_OPTIONS, options);
    }

    Object.defineProperties(component.prototype, {

      $$changeDetector: { writable: true },
      [options.changeDetector]: {
        get(): ChangeDetector<Cmp> {
          if (this.$$changeDetector === undefined) {
            this.$$changeDetector = new ChangeDetector<Cmp>(this, properties).addDetection();
          }
          return this.$$changeDetector;
        }
      },

      // Whether component changes are going to be detected or not.
      [options.detection]: {
        set(value: boolean): void {
          if (value === false) {
            this[options.changeDetector].detach();
          } else if (value === true) {
            this[options.changeDetector].reattach();
          }
        }
      },

      [options.properties]: {
        set(value: DetectionProperties): void {
          this.$$changeDetector.properties = value;
        },
        get(): DetectionProperties {
          return this.changeDetector.properties;
        }
      },
    });
  }
};
