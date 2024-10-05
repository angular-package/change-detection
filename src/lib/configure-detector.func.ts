
// Class.
import { ChangeDetector } from './change-detector.class';

// const.
import { DETECTOR_OPTIONS } from './detector-options.const';

// Interface.
import { DetectorOptions } from '../interface/detector-options.interface';

// Type.
import { DetectionProperties } from '../type/detection-properties.type';

/**
 * Function to use with decorator.
 * @param component Source component for properties.
 * @param properties Properties names to detect changes if true.
 * @param options Change default names assigned to component.
 */
export const configureDetector = <Cmp extends object | Function>(
  component: Function,
  properties: DetectionProperties<Cmp>,
  options: DetectorOptions = DETECTOR_OPTIONS
): void => {
  if (<Cmp>(component)) {
    if (<DetectorOptions>(options)) {
      options = Object.assign(DETECTOR_OPTIONS, options);
    }
    Object.defineProperties(component.prototype, {
      $$changeDetector: { writable: true },

      [options.changeDetector]: {
        get(): ChangeDetector<Cmp> {
          if (this.$$changeDetector === undefined) {
            this.$$changeDetector = new ChangeDetector<Cmp>(
              this,
              Object.keys(properties) as (keyof Cmp)[]
            );
          }
          return this.$$changeDetector;
        }
      },

      // Detaches the component from the change detector tree if `true`.
      [options.detached]: {
        set(value: boolean): void {
          if (value === true) {
            (this[options.changeDetector] as ChangeDetector<Cmp>).detach();
          } else if (value === false) {
            (this[options.changeDetector] as ChangeDetector<Cmp>).reattach();
          }
        }
      },

      // Enables detection in the component, which means detectable(not deactivated) properties perform detectChanges on set. 
      [options.detection]: {
        set(value: boolean): void {
          if (value === false) {
            (this[options.changeDetector] as ChangeDetector<Cmp>).detection.disable();
          } else if (value === true) {
            (this[options.changeDetector] as ChangeDetector<Cmp>).detection.enable();
          }
        }
      },

      // Detection properties.
      [options.properties]: {
        get(): DetectionProperties<Cmp> {
          return (this.$$changeDetector as ChangeDetector<Cmp>).detection.properties;
        }
      },

    });
  }
};
