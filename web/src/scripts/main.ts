import { initNav } from './nav';
import { initForm } from './form';
import { initMotion } from './motion';

initNav();
initForm();

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) initMotion();
