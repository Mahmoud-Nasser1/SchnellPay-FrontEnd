const spring = (i = 0) => ({ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 });
const snappy = (i = 0) => ({ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 });
const smooth = (i = 0) => ({ duration: 0.55, ease: "easeOut", delay: i * 0.08 });
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: spring(i) }),
};
const fadeDown = {
  hidden: { opacity: 0, y: -28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: smooth(i) }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.08 },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: spring(i) }),
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: spring(i) }),
};
const slideLeft = fadeLeft;
const slideRight = fadeRight;
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: snappy(i) }),
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, y: 0, transition: spring(i) }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const pageEnter = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const viewport = { once: true, margin: "-80px" };
export {
  fadeDown,
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  pageEnter,
  scaleIn,
  scaleUp,
  slideLeft,
  slideRight,
  stagger,
  staggerFast,
  staggerSlow,
  viewport,
};
