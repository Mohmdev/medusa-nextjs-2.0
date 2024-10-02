const menuWrapper = {
  open: {
    // width: 'max-content',
    // height: 'auto',
    opacity: 1,
    top: '100px',
    background: 'rgba(255, 255, 255, 0.2)',
    transition: { duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    // width: 'max-content',
    // height: 'auto',
    opacity: 0,
    top: '50px',
    background: 'transparent',
    transition: {
      duration: 0.5,
      delay: 0.5,
      type: 'tween',
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

const menuItems = {
  open: {
    // When animate= 'open', causes the child elements (<m.li>) to animate in with a staggered delay.
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    // When animate= 'closed', causes the child elements (<m.li>) to animate to animate out in reverse order.
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const menuItem = {
  open: {
    // When animate= 'open', set its vertical position to 0 and make it fully visible
    y: 0,
    opacity: 1,
    transition: {
      // Define the transition properties for the vertical position
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    // When animate= 'closed', move it down by 50 pixels and make it fully transparent
    y: 50,
    opacity: 0,
    transition: {
      // Define the transition properties for the vertical position
      y: { stiffness: 1000 },
    },
  },
}

/* ------------------------- ToggleButton Animations ------------------------ */
const hamburgerTopLine = {
  closed: {
    // top line
    d: 'M 2 2.5 L 20 2.5',
  },
  open: {
    // rotates and moves to form the top part of the X
    d: 'M 3 16.5 L 17 2.5',
  },
}

const hamburgerMiddleLine = {
  // middle line fade in and out
  closed: { opacity: 1 },
  open: { opacity: 0 },
}

const hamburgerBottomLine = {
  closed: {
    // bottom line
    d: 'M 2 16.346 L 20 16.346',
  },
  open: {
    // rotates and moves to form the bottom part of the X
    d: 'M 3 2.5 L 17 16.346',
  },
}

export {
  hamburgerBottomLine,
  hamburgerMiddleLine,
  hamburgerTopLine,
  menuItem,
  menuItems,
  menuWrapper,
}
