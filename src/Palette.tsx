import classNames from "classnames";
import React from "react";

const paletteVariants = [
  "primary",
  "secondary",
  "accent",
  "background",
  "disabled",
  "success",
  "info",
  "warning",
  "error",
] as const;

const paletteShades = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

type ShadeBoxProps = {
  variant: typeof paletteVariants[number];
  shade?: typeof paletteShades[number];
};

const ShadeBox: React.FC<ShadeBoxProps> = ({ variant, shade }) => {
  return (
    <div
      className={classNames(
        "w-full h-12 flex items-center justify-center",
        "whitespace-nowrap overflow-hidden",
        {
          [`bg-${variant}-${shade} text-on-${variant}-${shade}`]: shade,
          [`bg-${variant} text-on-${variant}`]: !shade,
        }
      )}
    >
      {shade ? `${variant}-${shade}` : variant}
    </div>
  );
};

const Palette: React.FC = () => {
  return (
    <div className="grid grid-cols-11 gap-y-2 m-4">
      {paletteVariants.map((variant) => (
        <React.Fragment key={variant}>
          {paletteShades.map((shade) => (
            <ShadeBox key={shade} variant={variant} shade={shade} />
          ))}
          <ShadeBox key="DEFAULT" variant={variant} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Palette;
