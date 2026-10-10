import Svg, { G, Path } from 'react-native-svg';

import { LOGO_ASPECT, LOGO_LAYERS, LOGO_VIEWBOX } from './logoPaths';

/** Groo logo (always Latin, never mirrored). `height` sets the size. */
export function Logo({ height = 30 }: { height?: number }) {
  return (
    <Svg width={height * LOGO_ASPECT} height={height} viewBox={LOGO_VIEWBOX} accessibilityRole="image" accessibilityLabel="Groo">
      {LOGO_LAYERS.map((layer) => (
        <G key={layer.color} fill={layer.color} transform="translate(0 887) scale(0.1 -0.1)">
          {layer.paths.map((d, i) => (
            <Path key={i} d={d} />
          ))}
        </G>
      ))}
    </Svg>
  );
}
