// internal
import { configureDetector } from './configure-detector.func';

// Interface.
import { DetectorOptions } from '../interface/detector-options.interface';

// Type.
import { DetectionProperties } from '../type/detection-properties.type';

/**
 * Decorator.
 * @param properties 
 * @param options 
 * @returns 
 */
export function ChangeDetection<Cmp extends Object | Function>({}: {
  properties: DetectionProperties<Cmp>,
  options?: DetectorOptions
}): ClassDecorator {
  return (component: Function): any =>
    configureDetector<Cmp>(
      component,
      arguments[0].properties,
      arguments[0].options,
    );
}
