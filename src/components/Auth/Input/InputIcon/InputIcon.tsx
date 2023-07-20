import React from 'react';

interface IInputIconProps {
  isVisible: boolean
  localClassName?: string
  toggleVisible: () => void
}

export function InputIcon({ localClassName, isVisible, toggleVisible }: IInputIconProps) {
  const [isIconVisible, setIsIconVisible] = React.useState(isVisible);

  React.useEffect(() => {
    setIsIconVisible(isVisible);
  });

  return (
    <button onClick={toggleVisible} type='button' className={localClassName} tabIndex={-1}>
      {isIconVisible
        ?
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="clip0_233_221">
              <rect fill="white" height="24" id="svg_1" width="24" />
            </clipPath>
          </defs>
          <g>
            <title>Layer 1</title>
            <g clipPath="url(#clip0_233_221)" id="svg_2">
              <path d="m6.86,6.27c2.68,-1.38 4.71,-1.27 5.14,-1.27c4.66,0 8.4,2.9 10,7c-0.39,1.01 -2.85,4.95 -4.29,5.26m-11.19,-10.74c-2.04,1.24 -3.62,3.17 -4.52,5.48c1.6,4.1 5.34,7 10,7c2.04,0 3.9,-0.55 5.48,-1.52m-7.6,-7.6c-0.54,0.54 -0.88,1.29 -0.88,2.12c0,1.66 1.34,3 3,3c0.83,0 1.58,-0.34 2.12,-0.88" fill="#ffffff" id="svg_3" stroke="#808185" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="m31,-48l27,14" id="svg_4" stroke="#808185" strokeLinecap="round" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
        :
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_233_221)">
            <path d="M10.7302 5.07319C11.1448 5.02485 11.5684 5 11.9999 5C16.6639 5 20.3998 7.90264 21.9999 12C21.6053 13.0104 21.0809 13.9482 20.4446 14.7877M6.51956 6.51944C4.47949 7.76406 2.90105 9.69259 1.99994 12C3.60008 16.0974 7.33597 19 11.9999 19C14.0375 19 15.8979 18.446 17.4805 17.4804M9.87871 9.87859C9.33576 10.4215 8.99994 11.1715 8.99994 12C8.99994 13.6569 10.3431 15 11.9999 15C12.8284 15 13.5785 14.6642 14.1214 14.1212" stroke="#808185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 4L20 20" stroke="#808185" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <defs>
            <clipPath id="clip0_233_221">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      }
    </button>
  );
}
