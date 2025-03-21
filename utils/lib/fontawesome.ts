import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS

// Prevent FontAwesome from adding its CSS automatically
config.autoAddCss = false;

library.add(fas, fab, far);