import type { ThreeElements } from "@react-three/fiber";

// React 19 removed the global JSX namespace that @react-three/fiber v8
// augments, so re-declare its intrinsic elements on React.JSX.
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

export {};
